var globalOptions,
		blockChecker,
		blockList,
		blockService;


var saveblockList= function(){
		chrome.storage.sync.set({'blocklist': blockList}, function(){
			console.log('blocklist updated');
		});
};


var regexMatching = function(list, target){
	var domainsArray = [
		"be",
		"com",
		"org",
		"net",
		"tv"
	];

	var redirSites = [
		"facebook.com/l.php"
		];
	var simpleSiteRegex,
		generalRegex,
		redirRegex;

	var domains =  '(' + domainsArray[0];

	var start = '^(http|https)://(www\\.)?';
	for (var j=1; j < domainsArray.length; j++){
		domains = domains + '|' + domainsArray[j];	
	}
	domains = domains + ')'
	var end = '\\.'+ domains + '/[\\W\\w]*$';
	redirRegex = new RegExp(start + redirSites[0] + '.*$');
	simpleSiteRegex = new RegExp(start+'.*$');
	var middle = "";
	var exactsiesBlock = false;
	for (var i = 0; i < list.length-1; i++){
		if (!simpleSiteRegex.test(list[i])){
			middle = middle+filterSimple(list[i])+'|';
		}
	}
	middle = '('+filterSimple(middle+list[list.length-1])+')';
	generalRegex = new RegExp(start+middle+end);
	if (list.indexOf(target)!==-1) exactsiesBlock = true;
	if (generalRegex.test(target) == true){
/*		console.log(start+middle+end);
		console.log(target);
		console.log(generalRegex.test(target) + " <GR TBONTB>"+ exactsiesBlock);*/
	}
	 
	var ifRedirUrlBlockCheck = redirRegex.test(target);
	var toBlockOrNotToBlock = (generalRegex.test(target) || exactsiesBlock ) && !ifRedirUrlBlockCheck;
	return toBlockOrNotToBlock;
}

var filterSimple = function(urlText){
	return urlText.replace('.','\\.');
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
		var regexBlockCheck = regexMatching(blockList, req.url) 
	
		var result = $.grep(currTabs, function(e){
					//console.log('e:');
					//console.log(e);
					return e.tabId == req.tabId;
			});
	//		console.log(result[0]);
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
			var subOrMain = req.type == 'sub_frame';
			regexBlockCheck = regexBlockCheck && !tabBlock && !subOrMain;
			if (regexBlockCheck){
		//		console.log(req);
	/*			var toInsert = new TabObject(req.tabId, req.url, true);
				currTabs.push(toInsert);*/
				InsertOrEditTabObject(req.tabId, req.url);
				storedUrl = req.url;
				return {
					redirectUrl : chrome.extension.getURL("background.html")
				};
			}
		};

	function InsertOrEditTabObject(tabId, url){
		var found = false;
		var result = $.grep(currTabs, function(e){
			if (e.tabId == tabId){
			//	console.log('changed e.origUrl from: ' + e.origUrl + ' to: ' + url);
				e.origUrl = url;
				found = true;
			} 
		});
		if (!found){
			currTabs.push(new TabObject(tabId, url, true));
		}
	}

	this.getUrl = function(){
		return storedUrl;
	};
};

var BlockList = function (){

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


