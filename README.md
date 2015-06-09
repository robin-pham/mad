#MAD

Mindfulness Anti Distraction 

Chrome extension to help curtail bad habitual distractions.

#How to run
<ul>
<li>Clone/Download zip.
<li>Go to chrome://extensions
<li>Check Developer mode in the top right
<li>Load unpacked extension and select the folder with the manifest.json file
</ul>

#About
I have 0 idea if this works in practice. 

Inspirations taken from bits and pieces of psychology studies and my own lazy-ass intuitions. <a href="http://www.amazon.com/Willpower-Rediscovering-Greatest-Human-Strength-ebook/dp/B0052REQCY">Related : Baumeister's work.</a> <a href="https://www.youtube.com/watch?v=HTfYv3IEOqM">Insightful Daniel Golemann Vid</a>

Previously tried using extensions that prevent distractions by fully blocking or restricting site usage (e.g. StayFocusd). Worked in the short term, but I would eventually just remove them out of inconvenience.

The goal is to aid the rewiring of wanting long-term goals (short-term happiness has value). Fun 'human-capital development' focused web browsing links are given as alternative browsing.


#Developer Diary
Monitoring my process. Started at HackWestern. <br>
v0.1 29/03/2015
- Knowledge basis: code academy javascript, stack overflow, github files of other chrome extensions, chrome extension api and docs.
- Heavily inspired by other anti distraction extensions, e.g. StayFocusd or ColdTurkey.
- Wanted to manipulate myself into not being distracted, by criticizing and causing cognitive dissonance.
- Knowledge gained: Negative, or annoyingly long to type guilt messages are draining. Hard to be productive when you're feeling shitty. Going to try to use inspiring, or user-empowering quotes that also make you think, but aren't depressing amongst other additional features in next vers.

v0.1.0.3 30/03/2015
- Changed UI so the alternatives are upfront, more immediate and relatively bigger. Intuitively that should be the focus, not the typing to unlock/go to the website.
- Learned a bit more jquery syntax. It's much nicer for manipulating html elements =D.
- The more positive focused thoughts seem better for now... Blind optimism doesn't seem appropriate here though.

v0.1.0.5 02/04/2015
- Fought around with AJAX functions. They're whack. Was too stubborn on trying to find a way to return a value from an async call. In the end, I should not fight with callback functions, just use em and reorganize my code so it's not like how you normally code in Java/C++,
- Moving on to user customization now. Lots of things to consider. Should I use angular for 1-pagey-ness functionality? Tough questions. I think I'll try.

v0.2.0.0 10/04/2015
- Learnt AngularJS to implement some one-page functionality goodness. It's SO COOOOOOL. Enjoying the simplicity of the MVC framework and how seamless and speedy things run. 
- Ran into more asynchronous problems, although this time I fixed them rather quickly now that I have more experience. Just gotta get used to that asynchronous thinkin ya feeeeel.
- I keep on thinking of more and more things to do or add. I'm going to have to speed up the rate in which I complete things, or else I'm going to get squashed.

v0.2.1.0 12/04/2015
- Now fully using AngularJS wherever I can. Still a newbie, but angular makes everything so much easier.
- Had a real hard time setting up Protractor with angular + chrome extensions. Gave up, but I still want to get into TDD. Going to try using Karma next?
- Finally got around to implementing some customization functionality. Took me around a whole day of coding.
- My code base is getting progressively more and more disgustingly obese and gross. 

v0.2.1.1 14/04/2015
- Bug fixing day! I'm beginning to think I should stagger-schedule the implementation of new features vs bug fixing.
- Man do I love bug fixing, seriously I'm hella good at it.
- Major bugs: Fixed alternate ways of trying to bypass the typing challenge. Fixed blocking of embedded requests. Poor fix, but a fix of teh facebook redirection links. 
- Still wanting to explore developmental tools and TDD. Grunt or something to build everything would be nice. apparently chjrome extensions are auto minified?

v.0.3.0 08/06/2015
- Added a few features, reason tracking and options to increase amount of phrases to get passed
- Decided against implementing notifications for now. Difficult to determine false negatives.
- Focused more on prevention methods. Reason tracking allows for immediate self evaluation. Gave an option to increase number of phrases to type. Delayed gratification works.
