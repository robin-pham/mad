popup.controller('PopupController', ['$scope',
	function($scope){

		$scope.isBlocked = false;

		$scope.addToBlock = function(){
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function callback(tabs){
				var currentTab = tabs[0];
				console.log(currentTab);
				console.log(bkg);
				bkg.blockService.add(currentTab.url);
				$scope.isBlocked = true;
				$scope.$apply();
			});
		};
		$scope.testfunc = function(){
			alert("DOES WORK>?");
		}
}]);

