require([
	'jquery'
], function($){

	jQuery("div#QtyBox").append('<input type="button" value="&#xf067;" id="add1" class="plus"/>').prepend('<input type="button" value="&#xf068;" id="minus1" class="minus" />');
	jQuery(".plus").click(function(){
		var currentVal = parseInt(jQuery(this).prev(".qty").val());

		if (!currentVal || currentVal=="" || currentVal == "NaN") currentVal = 0;

		jQuery(this).prev(".qty").val(currentVal + 1);
	});

	jQuery(".minus").click(function(){
		var currentVal = parseInt(jQuery(this).next(".qty").val());
		if (currentVal == "NaN") currentVal = 0;
		if (currentVal > 0){
			jQuery(this).next(".qty").val(currentVal - 1);
		}
	});


	var isNumberValidReturn= function(evt) {
		evt = (evt) ? evt : window.event;
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
		}
		return true;
	}
	$('.buynow').on('click',function(){
		$(this).html('Processing...');
	});
	$('.tocart').on('click',function(){
		$(this).find('span').html('Adding..')
		setTimeout(function(){   $('.tocart').find('span').html('Add to Bag') }, 5000);
	});
    }
);

