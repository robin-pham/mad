var globalOptions,
		blockChecker,
		blockList,
		blockService;
var DefaultBlockList =  [
      "facebook",
      "youtube",
      "twitter",
      "tumblr",
      "pinterest",
      "reddit",
			"instagram",
			"netflix",
			"twitch"
    ];

var saveblockList= function(){
		chrome.storage.sync.set({'blocklist': blockList}, function(){
			console.log('blocklist updated');
		});
};


var regexMatching = function(list, target){
	var start = '^(http|https)://(www\\.)?';
	var end = '\\.(be|com|org|net)/[\\W\\w]*$';
	var simpleSiteRegex = new RegExp(start+'.*$');
	var middle = "";
	var toBlockOrNotToBlock = false;
	for (var i = 0; i < list.length-1; i++){
		if (!simpleSiteRegex.test(list[i])){
			middle = middle+list[i]+'|';
		}
	}
	middle = '('+middle+list[list.length-1]+')';
	var generalRegex = new RegExp(start+middle+end);
	if (list.indexOf(target)!==-1) toBlockOrNotToBlock = true;
	toBlockOrNotToBlock = generalRegex.test(target) || toBlockOrNotToBlock;
	return toBlockOrNotToBlock;
}


function TabObject (tabId, origUrl, blockedStatus){
	this.tabId = tabId;
	this.currStatus = blockedStatus;
	this.origUrl = origUrl;

	this.changeStatus = function(newStatus){
		this.currStatus = newStatus;
	};
}


var BlockCheck = function(){
	var storedUrl="";
	var prevTabId;
	// TODO include timestamps check var prevTimeStamp=0;

	//RedirectonMatch Method
	this.redirectOnMatch = function(req){

		var tabBlock;
	/*	console.log('in ROM');
		console.log(blockList);*/
		var blocked = regexMatching(blockList, req.url) 
		var result = $.grep(currTabs, function(e){
				//console.log('e:');
				//console.log(e);
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
		chrome.storage.sync.get('blocklist', function(items){
			if (items.blocklist == undefined){
				blockList = DefaultBlockList;
				blockChecker = new BlockCheck(blockList);
			} else{
			/*	console.log('in BL get');
				console.log(items.blocklist);*/
				blockList = items.blocklist;
			}
		});
	};
	this.add = function(website){
		console.log(blockList);
		blockList.push(website);
		saveblockList();
	};

	this.addAtIndex = function(index, website){
	//	console.log("AAI: " + blockList);
		blockList.splice(index,0,website);
	};
	
	this.delete = function(index){
		console.log('deleting: ' + blockList[index]);
		blockList.splice(index, 1);
		saveblockList();
	};
	this.deleteLast = function(){
		console.log('deleting: ' + blockList[blockList.length-1]);
		blockList.splice(blockList.length-1, 1);
		saveblockList();
	};

	this.replace = function(index, replacement){
		console.log('replacing: ' + blockList[index]);
		blockList[index]=replacement;
		saveblockList();
		
	}
};

var WhiteList = function(){
	this.get = function(){
		chrome.storage.sync.get('whitelist', function(items){
			if (items.whitelist == undefined){
				whiteList = [];
			} else{
				whiteList = items.whitelist;
			}
		});
	};
	this.set = function(){
		chrome.storage.sync.set({'whitelist': whiteList}, function(){
			console.log('whitelist saved');
		});
	};

	this.add = function(data){
		whiteList.push(data);
		chrome.storage.sync.set({'whitelist': whiteList}, function(){
			console.log('whitelist saved');
		});
	};
};

var BlockListFactory = {
	getBlockList: function(){
		return new BlockList();
	},
	getWhiteList: function(){
		return new WhiteList();
	}
};

blockService = BlockListFactory.getBlockList();
whiteService = BlockListFactory.getWhiteList();
blockList = blockService.get();
blockChecker = new BlockCheck(blockList);


