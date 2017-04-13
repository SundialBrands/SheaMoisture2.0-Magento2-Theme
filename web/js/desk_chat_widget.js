var chat_base_url = "help.sheamoisture.com";
var new_chat_path = "/customer/widget/chats/new";
var new_email_path = "/customer/widget/emails/new";
var agent_check_path = "/customer/agent_online_check";
var query_params = "?ticket[custom_e_commerce]=SheaMoisture";
var chat_button_container;
var chat_url_prefix = "http://";
if(window.location.protocol == "https:") {
	chat_url_prefix = "https://";
}
chat_base_url = chat_url_prefix + chat_base_url;

window.onload = function() {

	chat_button_container = jQuery('#get-help-container');
	if(chat_button_container.length < 1 || jQuery('#live-chat-widget div.chat-button').length > 0 ) {
		return;
	}
	var helpdiv = '<div class="help-links" style="display:none;"><div class="help-links-close">X</div><div class="help-header">Our Customer Support Team is available from 10AM-5PM EST. Contact us via phone or live chat now.</div><div class="help-link">Chat: <span class="live-chat">Click here to chat now.</span></div><div class="help-link">Phone: <span><a href="tel:16318428800">(631)842-8800</a></span></div><div class="help-link"><a href="#" onclick="window.coBrowsingInstance &amp;&amp; coBrowsingInstance.showPopup();return false;">Share Screen</a>: <span>Please Chat or Call First</span></div></div>';
	chat_button_container.append(helpdiv + '<div title="Available from 10AM-5PM EST" class="help-button">Get Help</div>');
	
	var chat_agents = {
		online_agents:	-1,
		routing_agents:	-1
	};
	
	var chat_agents_url = chat_base_url + agent_check_path;
    jQuery.getJSON(chat_agents_url + "?callback=?", function(data) {
		if (data) {
			chat_agents = data;
			if(chat_agents.online_agents > 0) {
				chat_button_container.addClass('active');
				(function(e,i,g,h,t,c,o,b,r,w){
					r=i.createElement(g);
					r.setAttribute(h,c);
					o&&r.setAttribute(o,b);
					r.async=1;r.src='https://'+t+'/license'+c+'/dist/primary-bundle.js';
					w=i.getElementsByTagName(g)[0];w.parentNode.insertBefore(r,w);
				})(window,document,'script','data-8x8-co-browsing','cb.8x8.com','57ffc103d84d8e4c56744416','data-8x8-co-browsing-mode','full-control');
			}
		}
	});
	
	
	chat_button_container.find('.help-button').click( function(e) {
	
		if(jQuery(chat_button_container).hasClass('active')) {
			chat_button_container.find('.help-links').toggle();
		}
	
	});
	
	chat_button_container.find('.help-links-close').click( function(e) {
	
		jQuery('#get-help-container .help-links').hide();
	
	});
	
	chat_button_container.find('.live-chat').click( function(e) {
	
		window.open(chat_base_url + new_chat_path + query_params, 'sundialLiveChat', 'resizable=1, status=0, toolbar=0,width=400,height=400');
	
	});

};
