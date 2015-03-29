function set(el,text){
 while(el.firstChild)el.removeChild(el.firstChild);
 el.appendChild(document.createTextNode(text))
}
 
var sayings = [
	"I am in control over what I am doing. I am not distracted",
	"I have done all my goals today and am focused",
	"I am going to type to 10 while deciding whether or not I should really go through with this. 1 2 3 4 5 6 7 8 9 10.",
	"I am definitely not habitually going to this site. I have good reasons for going to this site",
	"There are so many better things I should be doing.  I'll still go through typing this. All to access some stupid banal web site.",
	"I normally don't insult myself, but sometimes drastic measures are necessary. I am a big fat poo poo butt. I am boo boo. My willpower is boo boo. This site is boo boo.",
	"I can always go to this site later in the day and there is no urgency to visit this site, but I am going anyways despite what's best for me"
	]
/* setupUpdater will be called once, on page load.
 */
var passed = false; 
window.onload = function setupUpdater(){
 var input=document.getElementsByTagName('textarea')[0]
   , count=document.getElementById('percent')
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
		set(count, "");
		passed = true;
		return;
	} else if (score> 0.1){
		set(count, "You are " + score*100 + "% accurate (need >91)");
	}
 }
 
 function eventHandler(){
  if(timeout) clearTimeout(timeout);
  timeout=setTimeout(handleChange, 50);
 }
 input.onkeydown=input.onkeyup=onClick=eventHandler;
};

//Button Listener function yeah yeah its jquery and the rest of this wasnt, I am learning!
$(function(){
	$(".btn-primary").click(function(){
		if (passed){
			$("strong").text("I hope you don't regret this");
			$(".btn-success").removeAttr("disabled");	
			console.log(chrome.extension.getBackgroundPage());
			$(".btn-success").attr("href", chrome.extension.getBackgroundPage().prevSite);
		}
		else 
			$("strong").text("You failed! (typos are allowed)");
	});
});

