module.exports = function(app) {
  app.controller('IndexController', ['$scope', 'PhotoService', function($scope, PhotoService) {
    $scope.photos = [];
    $scope.newPhoto = null;

    $scope.loadAll = function() {
      PhotoService.get()
        .then(function(res) {
          $scope.photos = res.data;
        }, function(err) {
          console.log('Error loading the photos');
        });
    };

    $scope.postNew = function(postData) {
      PhotoService.post(postData)
        .then(function(res) {
          $scope.photos.push(res.data);
          $scope.newPhoto = null;
        }, function(err) {
          console.log('Error posting the photo');
        });
    };
  }]);
};
