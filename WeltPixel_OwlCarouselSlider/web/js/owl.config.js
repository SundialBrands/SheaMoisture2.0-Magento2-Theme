var OWL = {
	init: function () {
	},

	load: function () {
		this.loader();
		this.arrows();
	},

	resize: function () {
		this.arrows();
	},

	arrows: function () {
		var carouselElement = jQuery('[class*="owl-carousel-products-"]'),
			windowWidth = jQuery(window).width(),
			carouselWidth = carouselElement.width(),
			carouselContainer = carouselWidth + 120,
			carouselControls = carouselElement.find('.owl-nav');

		if (carouselContainer >= windowWidth) {
			carouselControls.find('.owl-prev').css({
				'left': 0,
				'top': -15
			});
			carouselControls.find('.owl-next').css({
				'right': 0,
				'top': -15
			});
		} else {
			carouselControls.find('.owl-prev').removeAttr('style');
			carouselControls.find('.owl-next').removeAttr('style');
		}
	},

	loader: function () {
		setTimeout(function(){
			jQuery('.custom-slider #pre-div, .products.products-grid #pre-div').each(function(){
				jQuery(this).fadeOut('slow');
			});
		},200);
	}
};

require(['jquery'],
	function ($) {
		$(document).ready(function () {
			OWL.init();
		});

		$(window).load(function () {
			OWL.load();
		});

		var reinitTimer;
		$(window).on('resize', function () {
			clearTimeout(reinitTimer);
			reinitTimer = setTimeout(OWL.resize(), 100);
		});
	}
);
