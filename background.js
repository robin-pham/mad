chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
			console.log("Is this evenf ucking working details.url: " + details.url);
			console.log(details);
			return {redirectUrl: "http://google.com"};
		},
		{
			urls: ["<all_urls>"]
		},
		["blocking"]
);
