var globalOptions,
		blockChecker,
		blockList,
		blockService;

blockService = BlockListFactory.getBlockList();
blockService.set(DefaultList);
blockList = blockService.get();
blockChecker = new BlockCheck(DefaultList);

var prevSite = "";
chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
		//	console.log("Is this evenf ucking working details.url: " + details.url);
		//	console.log(details);
			prevSite = blockChecker.getUrl();
			return blockChecker.redirectOnMatch(details);
		},
		{
			urls: ["<all_urls>"]
		},
		["blocking"]
);
