/* A convenience function to reverse a string, and 
 * one to set the content of an element.
 */
 
function reverse(s){return s.split('').reverse().join('')}
 
function set(el,text){
 while(el.firstChild)el.removeChild(el.firstChild);
 el.appendChild(document.createTextNode(text))
}
 
var sayings = [
	"I am in control over what I am doing. I am not distracted",
	"I am as aware of my tongue as much as I am aware of how distracted the site I am going to can make me",
	"I have done all my goals today and am focused",
	"I am not habitually going to this site after creating a new tab. I have good reasons for going to this site",
	"I can always go to this site later in the day and there is no urgency to visit this site, but I am going anyways"
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
/* handleChange is called 50ms after the user stops 
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
 
/* eventHandler is called on keyboard and mouse events.
   If there is a pending timeout, it cancels it.
   It sets a timeout to call handleChange in 50ms. */
 function eventHandler(){
  if(timeout) clearTimeout(timeout);
  timeout=setTimeout(handleChange, 200);
 }
 input.onkeydown=input.onkeyup=onClick=eventHandler;
};

//Button Listener function
$(function(){
	$(".btn").click(function(){
		if (passed){
			$("strong").text("Debug: YOU PASSED");
		}
		else 
			$("strong").text("Debug: YOU FAILED");
	});
});

