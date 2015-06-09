app.controller('FooterController', ['$scope', '$modal',
	function($scope){
		$scope.useReasons = bkg.settings['useReasonList'];

		chrome.storage.sync.get('reasons', function(items){
			if (items.reasons == undefined){
				$scope.listOfReasons = {
					unsorted: [],
					good: [],
					bad: []
				};
			} else {
				$scope.listOfReasons = items.reasons;
			}
			$scope.$apply();
		});

		$scope.enterSite = function(href){
			var reason = $scope.reason;
			if (reason == "" || reason.length == 0 || reason == undefined) return;
			var currTabs = chrome.extension.getBackgroundPage().currTabs;
			var result = "";
			var reasonObj = {
				reason: reason,
				link: href.target.href,
				time: Date.now()
			};
			console.log(reasonObj);
			console.log($scope.listOfReasons);
			$scope.listOfReasons['unsorted'].push(reasonObj);
			chrome.storage.sync.set( {'reasons': $scope.listOfReasons}, function(){	console.log("reasons saved");	});
		};
}]);
