function set(el,text){
 while(el.firstChild)el.removeChild(el.firstChild);
 el.appendChild(document.createTextNode(text))
}
 
var defSayings = [
	"I am in control over my actions",
	"I have done my main goals for the day and need to use this website",
	"Sites are simply tools. They don't control me",
	"Resisting this site is easy",
	"I ain't gonna get tricky tricked by my mindless monotony",
	"I am going here not out of habit, but for a solid purpose",
	"Taking a second and thinkin a linkin"
	]
/* setupUpdater will be called once, on page load.
 */
var passed = false; 
window.onload = function setupUpdater(){
 var input=document.getElementById('input-a')
   , count=document.getElementById('message')
	 , targetText = defSayings[Math.floor(Math.random()*defSayings.length)]
	 , a = FuzzySet([targetText])
   , timeout=null;

	set(target, targetText);	


 function handleChange(){
  var newText=input.value;
	var score = a.get(newText)[0][0];
	//	console.log("handling change: score: " + score);
  if (score>0.88) {
		passed = true;
		return;
	} else if (score> 0.1){
	}
 }
 
 function eventHandler(){
  if(timeout) clearTimeout(timeout);
  timeout=setTimeout(handleChange, 50);
 }
 input.onkeydown=input.onkeyup=onClick=eventHandler;
};

var activate = function(){
//	console.log("does activate function trigger");
	var currTabs = chrome.extension.getBackgroundPage().currTabs;
	chrome.tabs.query({
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	}, function (tabs, req){
		result = $.grep(currTabs, function(e){
				return e.tabId == tabs[0].id;
		});
		req = result;
		if (req.length==0){
			return "";
		}
		else{
			$("#message").text("You've Unlocked The Button...\nI hope you don't regret this");
			$(".btn-success").removeAttr("disabled");	
			$(".btn-success").attr("href", req[0].origUrl);
		}
	});
	return 'poop';
}

//Button Listener function yeah yeah its jquery and the rest of this wasnt, I am learning!
$(function(){
	$(".btn-primary").click(function(){
		if (passed){
			activate();
		}
		else 
			$("#message").text("You failed! (some typos are allowed)");
	});
});

//enter listener
$(function(){
	$('#input-a').keydown(function(e) {
		if (e.keyCode == 13){
			if (passed){
				activate();
			}
			else
			$("#message").text("You failed! (some typos are allowed)");
		}
	});
});
