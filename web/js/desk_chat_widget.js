var chat_base_url = "help.sheamoisture.com";
var new_chat_path = "/customer/widget/chats/new";
var new_email_path = "/customer/widget/emails/new";
var agent_check_path = "/customer/agent_online_check";
var chat_button_container;
var chat_url_prefix = "http://";
if(window.location.protocol == "https:") {
	chat_url_prefix = "https://";
}
chat_base_url = chat_url_prefix + chat_base_url;

window.onload = function() {

	chat_button_container = jQuery('#live-chat-widget');
	if(chat_button_container.length < 1 || jQuery('#live-chat-widget div.chat-button').length > 0 ) {
		return;
	}
	chat_button_container.append('<div class="chat-button">Chat</div>');
	
	var chat_agents = {
		online_agents:	-1,
		routing_agents:	-1
	};
	
	var chat_agents_url = chat_base_url + agent_check_path;
    jQuery.getJSON(chat_agents_url + "?callback=?", function(data) {
		if (data) {
			chat_agents = data;
		}
	});
	
	if(chat_agents.online_agents > 0) {
		chat_button_container.addClass('active');
	}
	
	chat_button_container.click( function(e) {
	
		if(jQuery(this).hasClass('active')) {
			window.open(chat_base_url + new_chat_path, 'sundialLiveChat', 'resizable=1, status=0, toolbar=0,width=400,height=400');
		}
	
	});

};
