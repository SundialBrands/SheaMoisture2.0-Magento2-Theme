require([
        'jquery'
    ], function($){
	jQuery('.show-subcat-info').on('click', function(e){ 
	e.preventDefault();
	debugger;
	if(jQuery(this).parent().parent().find('.sub-cat-info').css('display') == 'none'){
	   jQuery('.sub-cat-info').slideUp();
	   jQuery('ul.columns-4').css('padding-bottom','0px');
jQuery('.show-subcat-info').removeClass('activeLI');
jQuery(this).addClass('activeLI');
	   var getSubCatHeight = jQuery(this).parent().parent().find('.sub-cat-info').height();
	   var getulHeight = jQuery(this).parent().height();
	   jQuery(this).parents().eq(3).css('padding-bottom',getSubCatHeight + 40);
	   jQuery(this).parent().parent().find('.sub-cat-info').css('top',getulHeight+20).slideDown();
	}
	else {
jQuery('.show-subcat-info').removeClass('activeLI');
	  jQuery(this).parents().eq(3).css('padding-bottom','0px');
	  jQuery(this).parent().parent().find('.sub-cat-info').css('top',0).hide();
	}
	});
});