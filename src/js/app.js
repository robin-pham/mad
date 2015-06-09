var app = angular.module("app",['ui.bootstrap' ]);

var bkg = chrome.extension.getBackgroundPage();

var defaultAlternatives = 	[
		{
			text: 'To-Do List',
			href: 	"https://keep.google.com/",
			imgsrc: 'img/gkeep.jpg'
		},
		{
			text: 'Learn',
			href: 'https://www.khanacademy.org',
			imgsrc: 'img/khanacad.jpg'
		},
		{
			text: 'Code',
			href: 	"http://www.codecademy.com",
			imgsrc: 'img/codeacad.jpg'
		}
	];



app.config([
  '$compileProvider',
  function ($compileProvider) {
      //  Default imgSrcSanitizationWhitelist: /^\s*(https?|ftp|file):|data:image\//
      //  chrome-extension: will be added to the end of the expression
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension|local|data):|data:image\//);
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
}
]);

//TODO: Manual links don't work so well, neither does this filter at all
app.filter('urlFilter', function(){
		return function(link){
			var result;
			var startingUrl = "http://";
			if (link.startWith("www")){
				result = startingUrl + link;
			} else{
				result = link;
			}
			return result;
		};
});
