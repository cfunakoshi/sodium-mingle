app.controller('home', [
'$scope',
'posts',
function($scope, posts){
  
  $scope.posts = posts.posts;

  $scope.deletePost = function($scope){
    posts.delete($scope);
  };
}]);

