function set(el,text){
 while (el.firstChild) {
     el.removeChild(el.firstChild);
 }
 el.appendChild(document.createTextNode(text))
}
 
var defSayings = [
	"I am in control over my actions",
	"I am aware of my main goals for the day",
	"Sites are only tools. They don't control me",
	"Resisting this site is easy",
	"Not all those who wander are lost",
	"I will fight my automatic actions",
	"Conserve willpower through smart choices",
	"Mindless rote behaviour is changeable",
	"Refocus on what needs to be done",
	"What was the cue that led me here?"
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
  if (score>0.88) {
		passed = true;
		return;
	} else if (score> 0.1){
	}
 }
 
 function eventHandler(){
  if (timeout) {
      clearTimeout(timeout);
  }
  timeout=setTimeout(handleChange, 30);
 }
 input.onkeydown=input.onkeyup=onClick=eventHandler;
};

var activate = function(){
	var currTabs = chrome.extension.getBackgroundPage().currTabs;
	chrome.tabs.query({
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	}, function (tabs){
		result = $.grep(currTabs, function(e){
				e.currStatus = false;
				return e.tabId == tabs[0].id;
		});
		if (result.length==0){
			return false;
		}
		else{
			$("#message").text("Button Unlocked");
			console.log(result[0]);
			$(".btn-success").removeAttr("disabled");	
			$(".btn-success").attr("href", result[0].origUrl);
			return true;
		}
	});
	return false;
}

//jquery (old code)
//click listener
$(function(){
	$(".btn-primary").click(function(){
		if (passed) {
			activate();
		} else {
            $("#message").text("Some typos are allowed, but not that many!");
        }
	});
});

//enter listener
$(function(){
	$('#input-a, #input-b').keydown(function(e) {
		if (e.keyCode == 13){
			if (passed) {
				activate();
			} else {
                $("#message").text("Some typos are allowed, but not that many!");
            }
		}
	});
});
