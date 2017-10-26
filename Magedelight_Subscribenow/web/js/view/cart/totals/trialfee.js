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
        'Magedelight_Subscribenow/js/view/summary/trialfee'
    ],
    function (Component) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magedelight_Subscribenow/cart/totals/trialfee'
            },
            /**
             * @override
             *
             * @returns {boolean}
             */
            isDisplayed: function () {
                if(this.isTrialEnabled()=="yes"){
                return this.getPureValue() >= 0;    
                }
                else{
                    return false;
                }
                
            }
        });
    }
);
