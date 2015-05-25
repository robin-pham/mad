
var currTabs = []; //TODO add additional information to these objects, e.g. time 
var updateInterval = 5;
var cumulativeTime = 0;
var totalTime = 0;

function updateTimes(){
	chrome.idle.queryState(60, function (state){
		if (state === "active"){
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function callback(tabs){
				var currentTab = tabs[0];
				var regexBlockCheck = (typeof currentTab == 'undefined') ? false : regexMatching(blockList, currentTab.url);
				if (regexBlockCheck) {
					totalTime +=5;
					cumulativeTime +=5;
					chrome.browserAction.setIcon({path: 'img/38unhappy.png'});
				} else {
					chrome.browserAction.setIcon({path: 'img/38.png'});
				}
			});
		} else{
			chrome.browserAction.setIcon({path: 'img/38.png'});
		}
	});
}


chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
			return blockChecker.redirectOnMatch(details);
		},
		{
			urls: ["<all_urls>"]
		},
		["blocking"]
);

setInterval(updateTimes, updateInterval * 1000);
