
require([
        'jquery'
    ], function($){
      $(document).ready(function(){
 				if($('.nav-toggle').css('display') == 'none'){
 					$('.header.links li a.language').parent().after( "<br/>" );
 				} else {
 					$('.header.links br').remove()
 				}
 				var searchInput = document.getElementById('search');

 				$(searchInput).on('blur', function(){
 					if($('.nav-toggle').css('display') == 'none'){
 						if($(searchInput).val() != '' ) {
 							$(searchInput).css('width','100%');
 						} else {
 							$(searchInput).css('width','46px%');
 					}
 				}
 			});
			$( ".terms_of_use" ).accordion();
			$(".terms_of_use_div").css('height','auto !important');
 		});
    });