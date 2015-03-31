function set(el,text){
 while(el.firstChild)el.removeChild(el.firstChild);
 el.appendChild(document.createTextNode(text))
}
 
var defSayings = [
	"I am in control over my actions",
	"I have done my main goals for the day, and need to use this website",
	"Sites are simply tools, they don't control me",
	"Resisting this site is easy",
	"I ain't gonna get tricky tricked by my mindless monotony",
	"I am going here not out of habit, but for a solid purpose",
	"Taking a second and thinkin-a-linkin"
	]
/* setupUpdater will be called once, on page load.
 */
var passed = false; 
window.onload = function setupUpdater(){
 var input=document.getElementsByTagName('input')[0]
   , count=document.getElementById('message')
	 , targetText = defSayings[Math.floor(Math.random()*defSayings.length)]
	 , a = FuzzySet([targetText])
   , oldText=input
   , timeout=null;

	set(target, targetText);	


 function handleChange(){
  var newText=input.value;
	var score = a.get(newText)[0][0];
  if (score>0.88) {
		//debug set(count, "You are " + score*100 + "% accurate (need >91)");
		passed = true;
		return;
	} else if (score> 0.1){
		//debug set(count, "You are " + score*100 + "% accurate (need >91)");
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
			$("#message").text("You've Unlocked The Button...\nI hope you don't regret this");
			$(".btn-success").removeAttr("disabled");	
			console.log(chrome.extension.getBackgroundPage());
			$(".btn-success").attr("href", chrome.extension.getBackgroundPage().prevSite);
		}
		else 
			$("#message").text("You failed! (typos are allowed)");
	});
});

//enter listener
$(function(){
	$('#input-a').keydown(function(e) {
		if (e.keyCode == 13){
			if (passed){
				$("#message").text("You've Unlocked The Button...\nI hope you don't regret this");
				$(".btn-success").removeAttr("disabled");	
				$(".btn-success").attr("href", chrome.extension.getBackgroundPage().prevSite);
			}
			else
			$("#message").text("You failed! (typos are allowed)");
		}
	});
});
