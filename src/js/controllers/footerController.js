app.controller('FooterController', ['$scope', '$modal',
	function($scope){
		chrome.storage.sync.get('reasons', function(items){
			if (items.reasons == undefined){
				$scope.listOfReasons = [];
			} else {
				$scope.listOfReasons = items.reasons;
			}
			$scope.$apply();
		});

		$scope.enterSite = function(){
			if ($scope.reason == "") return;
			console.log($scope.listOfReasons);
			$scope.listOfReasons.push($scope.reason);
			chrome.storage.sync.set( {'reasons': $scope.listOfReasons}, function(){
			});
			console.log($scope.listOfReasons);
		};
		
	
}]);
