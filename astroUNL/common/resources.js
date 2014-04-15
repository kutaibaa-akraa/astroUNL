function checkSwfPlacement() {
	var window = document.getElementById("windowBlock");
	var swf = document.getElementById("swfBlock");
	var info = document.getElementById("infoBlock");
	
	var swfHeight = parseFloat(swf.style.height);
	var prevTopMargin = parseFloat(swf.style.marginTop);
	var newTopMargin = -0.25*parseFloat(swfHeight);
	var minTopMargin = -0.25*parseFloat(window.clientHeight);
	
	if (navigator.appName=="Microsoft Internet Explorer") {
		newTopMargin = -Math.round(-newTopMargin);
		minTopMargin = -Math.round(-minTopMargin);
	}
	
	if (newTopMargin<=minTopMargin) {
		newTopMargin = minTopMargin;
	}
	else if (Math.abs(newTopMargin-prevTopMargin)<2) {
		return;
	}
	
	swf.style.marginTop = String(newTopMargin) + "px";
	info.style.marginTop = String(swfHeight + newTopMargin + 25) + "px";
}

function selectInputField(id) {
	var obj = window.document.getElementById(id);
	if (obj!=null) {
		obj.focus(); 
		obj.select();
	}
}

window.onload = checkSwfPlacement;
window.onresize = checkSwfPlacement;