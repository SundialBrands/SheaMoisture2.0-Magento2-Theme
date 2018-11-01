define([
    "jquery",
    "Amasty_Promo/js/discount-calculator",
    "uiRegistry",
    "Amasty_Promo/js/slick.min",
    "jquery/ui",
    'priceOptions'
], function ($, discount, registry) {

    $.widget('mage.ampromoPopup', {
        options: {
            slickSettings: {},
            sourceUrl: '',
            uenc: '',
            commonQty: '',
            products: {},
            formUrl: '',
            popupMode: 0
        },

        isSlickInitialized: false,
        isMultiplePopup: 1,

        /**
         *
         * @private _create
         */
        _create: function () {
            $(this.element).mousedown($.proxy(function (event) {
                if ($(event.target).data('role') == 'ampromo-overlay') {
                    event.stopPropagation();
                    this.hide();
                }
            }, this));

            $('[data-role=ampromo-popup-hide]').click($.proxy(this.hide, this));

            var widget = this;
            $(document).on('reloadPrice', function (item) {
                var promoItems = ('triggered_products' in widget.options.products)
                    ? widget.options.products.triggered_products : null;
                discount.update(promoItems, item);
            });

            /*compatibility with Amasty Checkout and Default Checkout*/
            registry.get('component=Magento_Checkout/js/view/summary', function (summaryComponent) {
                summaryComponent.isLoading.subscribe(function(isLoading){
                    if (!isLoading) {
                        widget.reload();
                    }
                })
            });

            /*this.initProductQtyState();
            if (parseInt(this.options.popupMode) === this.isMultiplePopup) {
                this.addCounterToPopup();
            }*/
        },

        addCounterToPopup: function () {
            var self = this;
            this.options.products = ('triggered_products' in this.options.products)
                ? this.options.products.triggered_products : null;

            $.each(this.options.products, function (index, value) {
                self.options.products[index]['old_value'] = value.qty;
            });

            this.addToCartDisableOrEnable(true);
        },


        /**
         * hide
         */
        hide: function () {
            $(this.element).fadeOut();
        },

        /**
         * show
         */
        show: function () {
            if (!this.isSlickInitialized) {
                this.init();
            }

            $(this.element).fadeIn();
        },

        /**
         *
         * @returns {mage.ampromoPopup}
         */
        initProductQtyState: function () {
            var self = this;

            this.setQtys();
            $.each($(this.element).find('[data-role=ampromo-item-qty-input]').find(':input'), function(index, value) {
                $(this).change(function() {
                    self.changeQty($(this));
                });
            });

            $.each($(this.element).find('[data-role=ampromo-product-select]'), function(index, value) {
                $(this).children().change(function() {
                    self.checkboxState(this);
                });
            });

            $(this.element).find('[data-role=ampromo-item-buttons]').find(":button").click(function() {
                self.sendForm();
            });

            return this;
        },

        /**
         *
         * @returns {mage.ampromoPopup}
         */
        init: function () {
            // Hack for "slick" library
            $(this.element).show();
            $('[data-role=ampromo-gallery]').slick(this.options.slickSettings);
            $(this.element).hide();

            this.isSlickInitialized = true;

            $('.ampromo_items_form').mage('validation');

            return this;
        },

        /**
         *
         * @returns {mage.ampromoPopup}
         */
        reload: function () {
            this.isSlickInitialized = false;
            var widget = this;

            $.ajax({
                url: this.options.sourceUrl,
                method: 'GET',
                data: {uenc: this.options.uenc},
                success: function (response) {
                    var container = $('[data-role="ampromo-items-container"]');
                    response = JSON.parse(response);
                    container.html(response.popup);
                    container.trigger('contentUpdated');
                    widget.options.products = JSON.parse(response.products);
                    widget.init();

                    var itemsCount = +widget.element.find('[data-role="ampromo-gallery"]').data('count');
                    var event = new $.Event('reloaded');
                    widget.element.trigger(event, [itemsCount]);
                }
            });

            return this;
        },

        /**
         * sendForm
         */
        sendForm: function () {
            var formData = this.prepareFormData();

            this.addToCartDisableOrEnable(true);
            $.ajax({
                 type: "POST",
                 url: this.options.formUrl,
                 data: {uenc: this.options.uenc, data: formData},
                 success: function() {
                    location.reload();
                }
             });
        },

        /**
         *
         * @returns {Array}
         */
        prepareFormData: function () {
            var formData = [];

            $.each($(this.element).find("[data-role=ampromo-items-form]"), function(index, value) {
                var a = {};

                formData[index] = $(value).serializeArray().reduce(function(obj, item) {
                    if (item.name.indexOf('super_attribute') >= 0 || item.name.indexOf('options') >= 0) {
                        re = /\[(.*?)\]/;
                        var key = item.name.match(re)[1],
                            keyName = item.name.indexOf('super_attribute') >= 0 ? 'super_attribute' : 'options';

                        a[key] = item.value;
                        obj[keyName] = a;
                    } else {
                        obj[item.name] = item.value;

                    }

                    return obj;
                }, {});
            });

            return formData;
        },

        /**
         *
         * @returns {mage.ampromoPopup}
         */
        setQtys: function() {
            this.updateCommonQty();
            this.updateProductLeftQty();

            return this;
        },

        /**
         *
         * @param elem
         * @returns {mage.ampromoPopup}
         */
        changeQty: function (elem) {
            var newQty = $(elem).val(),
                productSku = this.getProductSku(elem);

            this.updateValues(newQty, productSku);
            this.setQtys();

            return this;
        },

        /**
         *
         * @param newQty
         * @param productSku
         * @returns {mage.ampromoPopup}
         */
        updateValues: function (newQty, productSku) {
            var sumQty = 0,
                sumQtyOld = 0,
                self = this;

            if (this.isNumber(newQty) === false) {
                return this;
            }

            $.each(this.options.products, function(index, value) {
                if (value.sku == productSku) {
                    var newValue = value.old_value - parseInt(newQty, 10);
                    self.options.products[productSku].qty = (parseInt(newQty, 10) == value.old_value || self.isNumber(newValue))
                        ? newValue : value.old_value;
                }

                sumQty += value.qty;
                sumQtyOld += value.old_value;
            });

            this.addToCartDisableOrEnable(sumQty == sumQtyOld);
            this.options.commonQty = sumQty;

            return this;
        },

        /**
         *
         * @param value
         * @returns {*}
         */
        isNumber: function (value) {
            var parseValue = parseInt(value, 10);
            var isVaild = $.isNumeric(value);

            if (!isVaild || parseValue < 0) {
                alert('Please fill valid numeric value.');

                return false;
            }

            return parseValue;
        },

        /**
         *
         * @returns {mage.ampromoPopup}
         */
        updateCommonQty: function () {
            $(this.element).find('[data-role=ampromo-popup-common-qty]').html(this.options.commonQty);

            return this;
        },

        /**
         *
         * @returns {mage.ampromoPopup}
         */
        updateProductLeftQty: function () {
            var self = this;

            $.each(this.options.products, function(index, value) {
                var productDomBySku = self.getProductDomBySku(index);
                if (productDomBySku) {
                    $(productDomBySku.find('[data-role=ampromo-item-qty-input]')
                        .find('.ampromo-item-qty-left').find('span')).html(value.qty);
                }
            });

            return this;
        },

        /**
         *
         * @param elem
         * @returns {mage.ampromoPopup}
         */
        checkboxState: function (elem) {
            var productId = this.getProductId(elem),
                selectInput = $(this.getProductDomByProductId(productId)
                    .find('[data-role=ampromo-item-qty-input]')
                    .find(':input'));

            selectInput.prop('disabled', !($(elem).attr('checked')));

            return this;
        },

        /**
         *
         * @param state
         * @returns {mage.ampromoPopup}
         */
        addToCartDisableOrEnable: function(state) {
            $(this.element).find('[data-role=ampromo-item-buttons]').find(":button").attr('disabled', state);

            return this;
        },

        /**
         *
         * @param elem
         */
        getProductId: function (elem) {
            return this.getProductDomByElem(elem).attr('data-product-id');
        },

        /**
         *
         * @param elem
         */
        getProductSku: function (elem) {
            return this.getProductDomByElem(elem).attr('data-product-sku');
        },

        /**
         *
         * @param elem
         * @returns {*|jQuery}
         */
        getProductDomByElem: function (elem) {
            return $(elem).parents('[data-role=ampromo-item]');
        },

        /**
         *
         * @param sku
         * @returns {boolean}
         */
        getProductDomBySku: function (sku) {
            return this.getProductDom('data-product-sku', sku);
        },

        /**
         *
         * @param productId
         * @returns {boolean}
         */
        getProductDomByProductId: function (productId) {
            return this.getProductDom('data-product-id', productId);
        },

        /**
         *
         * @param attribute
         * @param value
         * @returns {boolean}
         */
        getProductDom: function (attribute, value) {
            var result = false;

            $.each($(this.element).find('[data-role=ampromo-item]'), function(index, item) {
                if (value == $(this).attr(attribute)) {
                    result = $(this);
                }
            });

            return result;
        }
    });

    return $.mage.ampromoPopup;
});
