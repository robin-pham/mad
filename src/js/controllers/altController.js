var defaultImgsSize = 6;

app.controller('AltController', ['$scope', '$modal',
	function($scope){
		$scope.bools = {};
		$scope.bools.addingItem = false;
		$scope.bools.addingImg = false;
		
		chrome.storage.sync.get('alternatives', function(items){
			if (items.alternatives == undefined ){
				$scope.alternatives = defaultAlternatives;
			} else{
			$scope.alternatives = items.alternatives;
			}
			/*console.log(items);
			console.log(items.length);
			console.log($scope.alternatives);*/
			$scope.editMode = new Array($scope.alternatives.length);
			for (var i = 0 ; i < $scope.alternatives.length ; i++){
				$scope.editMode[i]=false;
			}
			updateListOfPics();
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
			console.log("tis workings? " + $scope.bools.addingItem);
			if($scope.bools.addingItem == false){
				$scope.newAltText = "";
				$scope.newAltUrl = "";
				$scope.newAltImgUrl = "";
			}
			$scope.bools.addingItem = !$scope.bools.addingItem;
		};

		function newAltObject(text, href, imgsrc)
		{
			this.text = text;
			this.href = href;
			this.imgsrc = imgsrc;
		};


		$scope.submitNew = function(){
			randInt = Math.floor((Math.random()*defaultImgsSize));
			var def = ($scope.newAltImgUrl == "") ? 'img/default/happy' + randInt + '.png' : $scope.newAltImgUrl;
			console.log("imgsrc is: " + def + " scope new alt img url: " + $scope.newAltImgUrl);
			
			var altLink = {
				text: $scope.newAltText, 
				href: $scope.newAltUrl, 
				imgsrc: def
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

		$scope.$watch('alternatives', function(newVal){
			chrome.storage.sync.set({'alternatives': $scope.alternatives}, function(){
			});
		},true);
		
		$scope.editAlt = function(index){
			$scope.editMode[index] = !$scope.editMode[index];
		};


		$scope.listUrls = [];

		var updateListOfPics = function(){
			for (var i = 0; i < $scope.alternatives.length; i++){
				var bool = false;

					$scope.listUrls.push($scope.alternatives[i].imgsrc);
			}
			for (var i = 0; i < defaultImgsSize; i++){
				var defaultPicUrl = 'img/default/happy' + i + '.png';
				if (!(defaultPicUrl in $scope.listUrls)){
					$scope.listUrls.push(defaultPicUrl);
				}
			}
			var out = [];
			var seen = {};
			var len = $scope.listUrls.length;
			var j = 0;
			for(var i = 0; i < len; i++) {
				var item = $scope.listUrls[i];
				if(seen[item] !== 1) {
					seen[item] = 1;
					out[j++] = item;
        }
			}
			$scope.listUrls = out;
		}

		$scope.switchPic = function(dir, index){
			var curIndexInArray = $scope.listUrls.indexOf($scope.alternatives[index].imgsrc);
			if (dir=='left'){
				$scope.alternatives[index].imgsrc = $scope.listUrls[((curIndexInArray+$scope.listUrls.length)-1)%$scope.listUrls.length];
			} else if (dir=='right'){
				$scope.alternatives[index].imgsrc = $scope.listUrls[((curIndexInArray+$scope.listUrls.length)+1)%$scope.listUrls.length];
			}
			chrome.storage.sync.set({'alternatives': $scope.alternatives}, function(){
			});
		};
	
}]);
