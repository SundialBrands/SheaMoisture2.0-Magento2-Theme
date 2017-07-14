 require([
    'jquery'
], function ($) {
	$(document).ready(function(){
		$( "#gift-options-cart, .cart-discount, #block-charity, #cart-block-giftcard").wrapAll( "<div class='cart-container-Box col-md-6 col-lg-6 col-sm-6 col-xs-12'></div>" );
	});	
});