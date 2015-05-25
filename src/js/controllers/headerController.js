var ReasonTrackerModalInstanceCtrl = function($scope, $modalInstance){
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	chrome.storage.sync.get('reasons', function(item){
		if (item.reasons == undefined){
			$scope.reasons = [];
		} else {
			console.log(item.reasons);
			$scope.reasons = item.reasons;
		}
		$scope.$apply();
	});
};
var BlockListModalInstanceCtrl = function($scope, $modalInstance) {

	$scope.blocklist = bkg.blockList;
	$scope.undoBool = true;
	chrome.storage.sync.set({'alternatives': $scope.alternatives}, function(){
	});
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

	chrome.storage.sync.get('firstTimeDelete', function(item){
		if (item.firstTimeDelete == undefined){
			$scope.firstTimeDelete = false;
		} else{
			$scope.firstTimeDelete = item.firstTimeDelete;
		}
		$scope.$apply();
	});

	$scope.deleteBlock = function(index) {
		if (!$scope.firstTimeDelete){
				if (confirm("You can delete from now on if you press OK. But it may be better to leave things as they are.")){
					$scope.firstTimeDelete = true;
					chrome.storage.sync.set({'firstTimeDelete': $scope.firstTimeDelete}, function(){
						console.log('firstTimeDelete saved');
					});
					$scope.deleteBlock(index);
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
		$scope.openOptions = function(size) {
			var modalInstance = $modal.open({
				templateUrl:'../../blocklist.html',
				controller: BlockListModalInstanceCtrl,
				size: size
			});
		};

		$scope.openReasons = function(size){
			var modalInstance = $modal.open({
				templateUrl:'../../reasons.html',
				controller: ReasonTrackerModalInstanceCtrl,
				size: size
			});

		}
	
}]);


