/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define(
    [
        'jquery',
        'Magento_Ui/js/modal/modal',
        'mage/translate'
    ],
    function ($, modal, $t) {
        'use strict';
        jQuery.noConflict();
        return {
            modalWindow: null,

            /** Create popUp window for provided element */
            createModal: function(element) {
                this.modalWindow = element;
                var options = {
                    'type': 'popup',
                    'modalClass': 'agreements-modal',
                    'responsive': true,
                    'innerScroll': true,
                    'trigger': '.show-modal',
                    'buttons': [
                        {
                            text: $t('Close'),
                            class: 'action secondary action-hide-popup',
                            click: function() {
                                this.closeModal();
                            }
                        }
                    ]
                };
                modal(options, $(this.modalWindow));
            },

            /** Show login popup window */
            showModal: function() {
				var agreementText = jQuery('.checkout-agreements-item-content').text();
				jQuery('p.checkout-agreements-item-content-text').innerHTML = agreementText;
				jQuery('#myModal .modal-content').css({"background": "#fff", "height":"400px", "overflow-y": "auto"})
                //$(this.modalWindow).modal('openModal');
            }
        }
    }
);