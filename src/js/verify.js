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
	"I believe in my ability to manage myself",
	"My future self can benefit from this",
	"I will fight my automatic actions",
	"Conserve willpower through smart choices",
	"Mindless rote behaviour is changeable",
	"Refocus on what needs to be done",
	"I should strive to help out my future self",
	"What was the cue that led me here?",
	"I have a valid reason for using this website"
	]

/* setupUpdater will be called once, on page load.
 */
var passed = false; 
var count = 0;
var targetPasses= chrome.extension.getBackgroundPage().settings['numOfPasses'];
var currentText = "";

window.onload = function setupUpdater(){
 var input=document.getElementById('input-a')
   , timeout=null
	 , ifOne = "Verify"
	, numLeft = "Verify (" + (targetPasses-count) +")";
 changeText(target);
 if ((targetPasses-count)==1) set(submit1, ifOne);
 else set(submit1, numLeft);


function handleChange(){
  var a = FuzzySet([currentText])
  var newText=input.value;
  var score = a.get(newText)[0][0];
  if (score>0.88) {
    passed = true;
    return;
  } 
  else  {
    passed = false;
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

var changeText = function(element){
	$("#input-a").val('');
	var targetText = defSayings[Math.floor(Math.random()*defSayings.length)];
	while (targetText == currentText){
		targetText = defSayings[Math.floor(Math.random()*defSayings.length)];
	}
	currentText = targetText;
	set(element, targetText);
}

var activate = function(){
	count += 1;
	if (count >= targetPasses) {
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
				var numLeft = "Verifed";
				set(submit1, numLeft);
				$("#message").text("Button Unlocked");
				$("#submit1").attr("disabled", "enabled");
				console.log(result[0]);
				$(".btn-success").removeAttr("disabled");	
				$(".btn-success").attr("href", result[0].origUrl);
				return true;
			}
		});
	} else if ((targetPasses - count)==1){
		var numLeft = "Verify";
		set(submit1, numLeft);
		changeText(target);
	}
	else{
		var numLeft = "Verify (" + (targetPasses-count) +")";
		set(submit1, numLeft);
		changeText(target);
	}
	return false;
}

//jquery (old code)
//click listener
$(function(){
	$(".btn-primary").click(function(){
		if (passed) {
			activate();
			passed = false;
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
				passed = false;
			} else {
                $("#message").text("Some typos are allowed, but not that many!");
            }
		}
	});
});
