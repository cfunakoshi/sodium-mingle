var app = angular.module('sodium-mingle', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'home',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
    })
    .state('posts', {
  		url: '/posts',
  		templateUrl: '/posts.html',
  		controller: 'posts'
	  })
    .state('postdelete', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'posts',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    });

  $urlRouterProvider.otherwise('home');
}]);
app.controller('home', [
'$scope',
'posts',
function($scope, posts){
  
  $scope.posts = posts.posts;

  $scope.deletePost = function($scope){
    posts.delete($scope);
  };
}]);


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

app.factory('posts', ['$http', function($http){
  var o = {
    posts: []
  };

  o.delete = function(post) {
    return $http.delete('/posts/' + post._id).then(function(res){
      o.posts.splice(o.posts.indexOf(post), 1);
      return res.data;
    });
  }

  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };

  o.create = function(post) {
  return $http.post('/posts', post).success(function(data){
    o.posts.push(data);
  });
};

  return o;
}]);