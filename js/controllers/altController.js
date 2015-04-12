
app.controller('AltController', ['$scope', '$modal',
	function($scope){
		$scope.bools = {};
		$scope.bools.addingItem = false;
		
		chrome.storage.sync.get('alternatives', function(items){
			if (items.alternatives == undefined ){
				$scope.alternatives = defaultAlternatives;
			} else{
			$scope.alternatives = items.alternatives;
			}
			/*console.log(items);
			console.log(items.length);
			console.log($scope.alternatives);*/
			$scope.$apply();
		});

		$scope.deleteAlt = function(index){
			if (confirm('Are you sure you want to delete?')== true){
				$scope.alternatives.splice(index,1);
				chrome.storage.sync.set({'alternatives': $scope.alternatives}, function(){
					console.log('alternatives saved');
				});

			}
		};

		$scope.switchAdd = function(){
			//console.log("tis workings? " + $scope.bools.addingItem);
			$scope.bools.addingItem = !$scope.bools.addingItem;
		};

		function newAltObject(text, href, imgsrc)
		{
			this.text = text;
			this.href = href;
			this.imgsrc = imgsrc;
		};


		$scope.submitNew = function(){
		/*	console.log("does this function activate");
			console.log("new alt text: " + $scope.newAltText +" new altUrl: " + $scope.newAltUrl);*/
			randInt = Math.floor((Math.random()*5));
			$scope.newAltImgSrc = 'img/default/happy' + randInt + '.png';
			var altLink = {
				text: $scope.newAltText, 
				href: $scope.newAltUrl, 
				imgsrc: $scope.newAltImgSrc
			};
			$scope.alternatives.push(altLink);
			$scope.newAltUrl= "";
			$scope.newAltText = "";
			$scope.switchAdd();
			chrome.storage.sync.set({'alternatives': $scope.alternatives}, function(){
				console.log('alternatives saved');
			});
			/*console.log('loggin in submit');
			console.log($scope.alternatives);*/
		};

	
}]);
