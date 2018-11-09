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
				if($('.payment-method._active')){
					$('<div class="modalPopContent"></div>').insertBefore('div.checkout-agreement');												
					this.popUpModal(agreementText);
					this.popUpCloseModal();
				}
            },
			popUpModal: function(agreementText){				
				$('body.checkout-index-index').addClass('modalOverlay');
				$('.modalPopContent').wrap('<div class="overlay" id="popupOverlay"></div>');
				$('<div class="popUpClose"><a href="#" class="closeButton">&times;</a></div>').insertBefore('.modalPopContent');
				$('div.modalPopContent').text("");										
				$('div.modalPopContent').show(function(){
					$(this).html(agreementText);
				});
				$('<div class="popUpClose popUpCloseButton"><button>Close</button></div>').insertAfter('.modalPopContent');
				
			},
			popUpCloseModal: function(){
				$('div.popUpClose').click(function(){			
					$('#popupOverlay, div.modalPopContent, div.popUpClose, div.popUpCloseButton').remove();
					$('body.checkout-index-index').removeClass('modalOverlay');
					$('div.modalPopContent').show(function(){
						$(this).html("");
					});
				});
			}
        }
    }
);