
var currTabs = []; //TODO add additional information to these objects, e.g. time 
var prevSite = "";

chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
//		console.log("Is this evenf ucking working details.url: " + details.url);
			prevSite = blockChecker.getUrl();
			return blockChecker.redirectOnMatch(details);
		},
		{
			urls: ["<all_urls>"]
		},
		["blocking"]
);
