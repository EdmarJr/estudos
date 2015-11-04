_alreadyinUse = 0;

function reloadPubDevices(indice,device) {
	if(typeof device != "undefined" && device == "mobile")

		if (_alreadyinUse != 0) {
			rand = "1234567890";
			ran = new String(Math.random());
			rand = ran.substring(2, 11);
			if ($("#BEADA00106")[0]) {
				$("#BEADA00106").removeAttr("data-pid");
				$("#BEADA00106 .advertising").html('<iframe src="http://adserver.ig.com.br/RealMedia/ads/adstream_sx.ads/mobile.brasileconomico.ig.com.br/' + rand + '@Top3" width="320" height="50" frameborder="0" marginheight="0" marginwidth="0" scrolling="no">' + '</iframe>');
			}
		} 
		else {
			_alreadyinUse = 1;
		}

	}


window.onresize = function(){
	if(document.documentElement.clientWidth <= 768){
		reloadPubDevices('','mobile');
	}
}