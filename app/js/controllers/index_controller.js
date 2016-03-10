module.exports = function(app) {
  app.controller('IndexController', ['$scope', 'PhotoService', function($scope, PhotoService) {
    $scope.photo = [];
    $scope.newPhoto = null;

    $scope.loadAll = function() {
      PhotoService.get()
        .then(function(res) {
          $scope.photo = res.data;
        }, function(err) {
          console.log('Error loading the photos');
        });
    };

    $scope.postNew = function(postData) {
      PhotoService.post(postData)
        .then(function(res) {
          $scope.photo.push(res.data);
          $scope.newPhoto = null;
        }, function(err) {
          console.log('Error posting the photo');
        });
    };
  }]);
};
