settings.controller('SettingsController', ['$scope',
	function($scope){
		$scope.currentSettings = bkg.settings;
		$scope.numberList =	[1,2,3,4,5,6,7,8,9,10];
		$scope.yesNo = [true,false];


		$scope.changeItem = function(item){
			console.log("selected" + item);
		};

		$scope.settingChanged = function(){
			chrome.storage.sync.set({'settings': $scope.currentSettings}, function(){
				console.log('settings saved');
			})
		};
		
}]);

