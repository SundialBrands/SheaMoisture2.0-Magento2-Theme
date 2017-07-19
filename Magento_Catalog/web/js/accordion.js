    require([
        'jquery'
    ], function($){
		'use strict'; 
            $(document).ready(function(){
            setTimeout(function(){ 
             }, 500);
            $("#select_1 option:contains('One Time')").attr("selected", "selected");
            $('.data.switch').on('click', function(e){
                e.preventDefault();
                if ($(this).parent().hasClass('active')){ 
                     $('.data.item.title').removeClass('active');
                     $('.data.item.content').slideUp();
                } else {
                    var getHref = $(this).attr('href');
                    getHref.slice( 1 );
                   $(this).parent().addClass('active');
                   $('#'+getHref).slideDown();
                }
                e.stopPropagation();
            });		    
            if ($( ".product-options-wrapper" ).length > 0) {
                if ($(".product-options-wrapper option:first").val() != "") {
                    $(".product-options-wrapper option:first").attr('selected','selected');
                } else {
                    $(".product-options-wrapper option:eq(1)").attr('selected','selected');
                }
            }
    
        }); 
        
    });