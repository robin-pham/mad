app.controller('AltController', ['$scope',
	function($scope){
		$scope.alternatives = [
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
		$scope.delete = function(index){
			$scope.alternatives.splice(index, 1);
		};
}]);
