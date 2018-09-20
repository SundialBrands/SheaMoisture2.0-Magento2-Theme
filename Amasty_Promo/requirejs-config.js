var config = {
    map: {
        '*': {
            amasty_popup: 'Amasty_Promo/js/popup',
            amasty_slick: 'Amasty_Promo/js/slick.min'
        }
    },
    config: {
        mixins: {
            'Magento_Checkout/js/view/summary/item/details/thumbnail': {  // Target module
                'Amasty_Promo/js/checkout/sidebar-image-update': true  // Extender module
            },
            'Magento_Checkout/js/view/summary/cart-items': {
                'Amasty_Promo/js/checkout/cart-items-counter-update': true
            }
        }
    }
};