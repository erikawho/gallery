module.exports = function(app) {
  app.factory('PhotoService', ['$http', function($http) {
    return {
      baseUrl: 'http://localhost:5000/api/photo',
      get: function() {
        return $http.get(this.baseUrl);
      },
      post: function(postData) {
        return $http.post(this.baseUrl, postData);
      }
    };
  }]);
};
