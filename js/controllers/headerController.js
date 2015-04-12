var ModalInstanceCtrl = function($scope, $modalInstance) {

	$scope.blocklist = bkg.blockList;
	//$scope.enabledEdits = [];
	//keep track of every action
	//for each action keep type and what was done
	//redo in queue like fashion?
	$scope.undoBool = true;
	$scope.undoHistoryQueue = [];

	$scope.undo = function(){
		if ($scope.undoHistoryQueue.length>0){
			var action = $scope.undoHistoryQueue.shift();
			if (action.type == 'deletion'){
				bkg.blockService.addAtIndex(action.index, action.data);
			} else if (action.type =='replace'){
				bkg.blockService.replace(action.index, action.data);
			} else if (action.type =='add'){
				bkg.blockService.deleteLast()
			}
			if ($scope.undoHistoryQueue.length<=0){
				$scope.undoBool = true;
			}
		} 
		
	}
	$scope.deleteSpree = false;
	$scope.deleteBlock = function(index) {
		if (!$scope.deleteSpree){
			if (confirm('Hey! You can still go to this site. You just gotta type a tiny message. (psst press cancel)')){
				if (confirm("You're probably a cool person. Cool people don't care about a lil typing every now and then")){
					if (confirm("Let's just assume you're doing this for good reasons (you can still press cancel if you realize you aren't)")){
					$scope.deleteSpree = true;
					$scope.deleteBlock(index);
					}
				}
			}
		} else{
			$scope.undoHistoryQueue.push({
				type: 'deletion',
				index: index,
				data: bkg.blockList[index]
			});
			$scope.undoBool = false;
			bkg.blockService.delete(index);
		}
	
	}

	$scope.saveBlock = function(index, replacement){
		if (replacement == bkg.blockList[index]) return;
		$scope.undoHistoryQueue.push({
			type: 'replace',
			index: index,
			data: bkg.blockList[index]
		});
		$scope.undoBool = false;
		bkg.blockService.replace(index, replacement);
	}
	
	$scope.ok = function(){
		console.log(bkg);
	};

	$scope.addSimple = function(){
		$scope.undoHistoryQueue.push({
			type: 'add',
			index: bkg.blockList.length-1,
			data: $scope.simple
		});
		$scope.undoBool=false;
		bkg.blockService.add($scope.simple);
	}
	$scope.addExact= function(){
		$scope.undoHistoryQueue.push({
			type: 'add',
			index: bkg.blockList.length-1,
			data: $scope.exact
		});
		$scope.undoBool=false;
		bkg.blockService.add($scope.exact);
	}

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
};


app.controller('HeaderController', ['$scope', '$modal',
	function($scope, $modal){
		console.log('header controller');
		$scope.openOptions = function(size) {
			var modalInstance = $modal.open({
				templateUrl:'../../options.html',
				controller: ModalInstanceCtrl,
				size: size
			});
		};
	
}]);


