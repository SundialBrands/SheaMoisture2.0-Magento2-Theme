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
				var agreementText = document.getElementsByClassName('checkout-agreements-item-content')[0].textContent;
				if(jQuery('.payment-method._active')){
					jQuery('<div class="modalPopContent"></div>').insertBefore('div.checkout-agreement');												
					this.popUpModal(agreementText);			
				}
            },
			popUpModal: function(agreementText){				
				jQuery('body.checkout-index-index').addClass('modalOverlay');
				jQuery('.modalPopContent').wrap('<div class="overlay" id="popupOverlay"></div>');
				jQuery('<div class="popUpClose"><a href="#" class="closeButton">&times;</a></div>').insertBefore('.modalPopContent');
				jQuery('div.modalPopContent').text("");										
				jQuery('div.modalPopContent').show(function(){
					jQuery(this).html(agreementText);
				});
				jQuery('div.popUpClose a.closeButton').click(function(){					
					jQuery('#popupOverlay, div.modalPopContent, div.popUpClose').remove();
					jQuery('body.checkout-index-index').removeClass('modalOverlay');
					jQuery('div.modalPopContent').show(function(){
						jQuery(this).html("");
					});
				});
			}
        }
    }
);