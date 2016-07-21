app.controller('posts', [
'$scope',
'$location',
'posts',
function($scope, $location, posts){

  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      content: $scope.content,
      description: $scope.description,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.content = '';
    $scope.description = '';
    $scope.link = '';
    $location.path('/home');
  };

}]);
