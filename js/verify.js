function set(el,text){
 while(el.firstChild)el.removeChild(el.firstChild);
 el.appendChild(document.createTextNode(text))
}
 
var defSayings = [
	"I am in control over my actions",
	"I have done my main goals, and need to use this website",
	"This site is simply a small tool",
	"Resisting this site is easy",
	"I ain't gonna get tricky tricked",
	"Life's boo boo, but I'll get through too",
	"Imma take a second and think"
	]
/* setupUpdater will be called once, on page load.
 */
var passed = false; 
window.onload = function setupUpdater(){
 var input=document.getElementsByTagName('textarea')[0]
   , count=document.getElementById('percent')
   , target=document.getElementById('target')
	 , targetText = defSayings[Math.floor(Math.random()*defSayings.length)]
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

