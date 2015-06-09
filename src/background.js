
var currTabs = []; 
var updateInterval = 5;
var cumulativeTime = 0;
var totalTime = 0;
var settings = {};

var defaultSettings = {
	"numOfPasses": 1,
	"useReasonList": true
};

var updateSettings = function(){
	chrome.storage.sync.get('settings', function(items){
		if (items.settings == undefined){
			settings = defaultSettings;
		} else {
			settings = items.settings;
		}
		console.log(settings);
	});
};
updateSettings();

var saveSettings = function(){
	chrome.storage.sync.set({'settings': settings}, function(){
		console.log('settings saved');
	});
};

var deleteSettings = function(){
	chrome.storage.sync.remove('settings', function(){
		console.log('settings deleted');
	});
};

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

//setInterval(updateTimes, updateInterval * 1000);
