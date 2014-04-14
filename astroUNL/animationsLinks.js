
var currPreviewID = null;

function onRollOverItem(id) {
	var obj = window.document.getElementById(id);
	if (obj!=null) {
		openPreview(id);
	}
}

function onRollOutFromItem(id) {
	var obj = window.document.getElementById(id);
	if (obj!=null) {
		closePreview(obj);
	}
}

function openPreview(id) {
	
	if (id==currPreviewID) return;
	
	currPreviewID = id;
	
	hidePreview();
	
	var preview = document.getElementById("animPreview");
	preview.style.left = String(findPosX(document.getElementById(currPreviewID))+180) + "px";
	
	var descriptionBlock = window.document.getElementById("animPreviewDesc");
	descriptionBlock.innerHTML = resourceData[id].desc;
	//while (descriptionBlock.childNodes.length >= 1) descriptionBlock.removeChild(descriptionBlock.firstChild);       
	//descriptionBlock.appendChild(document.createTextNode(resourceData[id].desc));
	
	var titleBlock = window.document.getElementById("animPreviewTitle");
	titleBlock.innerHTML = resourceData[id].title;
	//while (titleBlock.childNodes.length >= 1) titleBlock.removeChild(titleBlock.firstChild);       
	//titleBlock.appendChild(document.createTextNode(resourceData[id].title));
	
	var imageBlock = window.document.getElementById("animPreviewThumb");
	imageBlock.onload = onThumbLoaded;
	imageBlock.src = resourceData[id].src;
	imageBlock.alt = resourceData[id].title;
}

function hidePreview() {
	var prevContainer = document.getElementById("animPreviewContainer");
	prevContainer.style.display = "none";
}

function closePreview() {
	hidePreview();
	currPreviewID = null;
}

function showPreview() {
	var prevContainer = document.getElementById("animPreviewContainer");
	prevContainer.style.display = "block";
}

function onThumbLoaded() {
	showPreview();
	updatePreviewPosition();
}

function updatePreviewPosition() {
	
	if (currPreviewID==null) return;
	
	var iebody = (document.compatMode && document.compatMode!="BackCompat") ? document.documentElement : document.body;
	var scrollOffset = document.all ? iebody.scrollTop : pageYOffset;

	var preview = document.getElementById("animPreview");
	var previewHeight = getStyle(preview, "height");
	if (previewHeight=="auto") previewHeight = preview.offsetHeight;
	previewHeight = parseFloat(previewHeight);
	
	var itemY = findPosY(document.getElementById(currPreviewID));
	var y = itemY - scrollOffset;
	
	var viewport = getViewportDimensions();
	
	var margin = 40;
	
	if (y<0 || y>viewport.height) {
		closePreview();
		return;
	}
		
	if (y<margin) {
		y = margin;	
	}
	else if ((y+previewHeight)>(viewport.height-margin)) {
		y = viewport.height - margin - previewHeight;
	}
	
	preview.style.top = scrollOffset + y + "px";
}

function getViewportDimensions() {
	var viewportWidth;
	var viewportHeight;

	if (typeof window.innerWidth != "undefined") {
		viewportWidth = window.innerWidth;
		viewportHeight = window.innerHeight;
	}
	else if (typeof document.documentElement != "undefined" && typeof document.documentElement.clientWidth != "undefined" && document.documentElement.clientWidth != 0) {
		viewportWidth = document.documentElement.clientWidth;
		viewportHeight = document.documentElement.clientHeight;
	}
	else {
		viewportWidth = document.getElementsByTagName("body")[0].clientWidth;
		viewportHeight = document.getElementsByTagName("body")[0].clientHeight;
	}
	
	return {height: parseFloat(viewportHeight), width: parseFloat(viewportWidth)};
}

function findPosX(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		while (1) {
			curleft += obj.offsetLeft;
			if (!obj.offsetParent) break;
			obj = obj.offsetParent;
		}
	}
	else if(obj.x) curleft += obj.x;
	return curleft;
}

function findPosY(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		while (1) {
			curtop += obj.offsetTop;
			if(!obj.offsetParent) break;
			obj = obj.offsetParent;
		}
	}
	else if(obj.y) curtop += obj.y;
	return curtop;
}

function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

window.onresize = updatePreviewPosition;
window.onscroll = updatePreviewPosition;
