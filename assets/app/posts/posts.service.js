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