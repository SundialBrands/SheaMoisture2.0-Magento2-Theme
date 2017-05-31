/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
/*global define*/
define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/totals',
        'mage/url'
    ],
    function(Component, totals, url) {
        'use strict';
        return Component.extend({
            isLoading: totals.isLoading,
            cartURL: url.build('checkout/cart'),
        });
    }
);
