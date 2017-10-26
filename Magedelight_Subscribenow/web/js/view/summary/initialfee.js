/*
 * Magedelight
 * Copyright (C) 2017 Magedelight <info@magedelight.com>
 *
 * @category Magedelight
 * @package Magedelight_Subscribenow
 * @copyright Copyright (c) 2017 Mage Delight (http://www.magedelight.com/)
 * @license http://opensource.org/licenses/gpl-3.0.html GNU General Public License,version 3 (GPL-3.0)
 * @author Magedelight <info@magedelight.com>
 */
/*global define*/
define(
    [
        'Magento_Checkout/js/view/summary/abstract-total',
        'Magento_Checkout/js/model/quote',
        'Magento_Catalog/js/price-utils',
        'Magento_Checkout/js/model/totals'
    ],
    function (Component, quote, priceUtils, totals) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magedelight_Subscribenow/summary/initialfee'
            },
            totals: quote.getTotals(),
            isDisplayed: function() {
                return this.isFullMode() && this.getPureValue() != 0;
            },
	   getPureValue: function() {
                var price = 0;
                var total_segments=window.checkoutConfig.totalsData.total_segments;
                for(var prop in total_segments){
                    if(total_segments[prop].code=="subscribenow_init_amount"){
                        price = parseFloat(total_segments[prop].value);
                    }
                }                                  
                return price;
                },                
            getValue: function() {
                return this.getFormattedPrice(this.getPureValue());
            }	
        });
    }
);
