
var DefaultList =  [
      "facebook",
      "youtube",
      "twitter",
      "tumblr",
      "pinterest",
      "myspace",
      "livejournal",
      "digg",
      "stumbleupon",
      "reddit",
      "kongregate",
      "newgrounds",
      "addictinggames",
      "hulu",
			"pornhub"
    ];
var regexMatching = function(list, target){
	var start = '^(http|https)://(www\\.)?(';
	var end = '\\.(be|com|org|net)/[\\W\\w]*$';
	var middle = "";
	for (var i = 0; i < list.length-1; i++){
		middle = middle+list[i]+'|';
	}
	middle = middle+list[list.length-1]+')';
	var x = new RegExp(start+middle+end);
	//console.log("what is target: " + target);
	//console.log("what is xtesttarget: " + x.test(target));
	return x.test(target);
}


var BlockCheck = function(blocklist){
	var storedUrl="";
	var prevTabId;
	// TODO include timestamps check var prevTimeStamp=0;
	this.blocklist = blocklist;

	this.redirectOnMatch = function(req){
		var blocked = regexMatching(blocklist, req.url) && (req.tabId!==prevTabId) ;
		if (blocked && req.method=="GET"){
		console.log(req);
			storedUrl = req.url;
			if (req.tabId!==chrome.extension.getURL) prevTabId= req.tabId;
			return {
				redirectUrl : chrome.extension.getURL("background.html")
			};
		}
	};
	this.getUrl = function(){
		return storedUrl;
	};
};

var BlockList = function (){
	this.get = function(){
		return JSON.parse(localStorage['blocklist']);
	};
	this.set = function(data){
		localStorage['blocklist'] = JSON.stringify(data);
	};
};

var BlockListFactory = {
	getBlockList: function(){
		return new BlockList();
	}
};
