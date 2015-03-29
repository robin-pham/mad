function set(el,text){
 while(el.firstChild)el.removeChild(el.firstChild);
 el.appendChild(document.createTextNode(text))
}
 
var sayings = [
	"I am in control over what I am doing. I am not distracted",
	"I have done all my goals today and am focused",
	"I can totally type to 10 and still choose not to go to an alternative site. 1 2 3 4 5 6 7 8 9 10.",
	"I am not habitually going to this site after creating a new tab. I have good reasons for going to this site",
	"There are so many better things to do.  I'll still go through typing this to experience this banal web site.",
	"I can always go to this site later in the day and there is no urgency to visit this site, but I am going anyways despite what's best for me"
	]
/* setupUpdater will be called once, on page load.
 */
var passed = false; 
window.onload = function setupUpdater(){
 var input=document.getElementsByTagName('textarea')[0]
   , count=document.getElementById('charCount')
   , target=document.getElementById('target')
	 , targetText = sayings[Math.floor(Math.random()*sayings.length)]
	 , a = FuzzySet([targetText])
   , orig=document.getElementById('original')
   , oldText=input
   , timeout=null;

	set(target, targetText);	


/* handleChange is called 200ms after the user stops 
   typing. */
 function handleChange(){
  var newText=input.value;
	var score = a.get(newText)[0][0];
  if (score>0.91) {
		passed = true;
		set(orig, "YOU WON");
		return;
	}
  set(count, 'Debug: You entered '+newText.length+' characters.');
  set(orig, 'Debug: Score:' + score);
 }
 
 function eventHandler(){
  if(timeout) clearTimeout(timeout);
  timeout=setTimeout(handleChange, 130);
 }
 input.onkeydown=input.onkeyup=onClick=eventHandler;
};

//Button Listener function
$(function(){
	$(".btn-primary").click(function(){
		if (passed){
			$(".btn-success").removeAttr("disabled");	
			console.log(chrome.extension.getBackgroundPage());
			$(".btn-success").attr("href", chrome.extension.getBackgroundPage().prevSite);
		}
		else 
			$("strong").text("You failed! (typos are allowed)");
	});
});

