var config = {
  	"paths": {
	   "bootstrap": 'sundialbrands/theme-frontend-sheamoisture/js/bootstrap.min.js',
	   "youtubepopup": 'sundialbrands/theme-frontend-sheamoisture/js/YouTubePopUp_jquery.js'
   	},
  	"shim": {
     	"bootstrap": {
     		"deps":["jquery"]
     	},
     	"youtubepopup": {
     		"deps":["jquery"]
     	}
    },
    map: {
        '*': {
            'Magento_Checkout/view/frontend/web/templates/summary/cart-items.html':
                'sundialbrands/theme-frontend-sheamoisture/Magento_Checkout/templates/summary/cart-items.html'
        }
    }
};
