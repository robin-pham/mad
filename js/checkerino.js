
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

function TabObject (tabId, origUrl, blockedStatus){
	this.tabId = tabId;
	this.currStatus = blockedStatus;
	this.origUrl = origUrl;

	this.changeStatus = function(newStatus){
		this.currStatus = newStatus;
	};
}


var BlockCheck = function(blocklist){
	var storedUrl="";
	var prevTabId;
	// TODO include timestamps check var prevTimeStamp=0;
	this.blocklist = blocklist;
	this.redirectOnMatch = function(req){

		var tabBlock;
		var blocked = regexMatching(blocklist, req.url) 
		var result = $.grep(currTabs, function(e){
				return e.tabId == req.tabId;
		});
		if (result.length==0)
			tabBlock= false;	
		else {
			//validate if tab should be blocked again or not
			//TODO ADD time functionality here
			var resultStatus = result[0].currStatus;
			if (resultStatus == false){
				tabBlock = true;
			}
		}
		blocked = blocked && !tabBlock;
		if (blocked){
			var toInsert = new TabObject(req.tabId, req.url, false);
			currTabs.push(toInsert);
			storedUrl = req.url;
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
