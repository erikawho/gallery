module.exports = function(app) {
  app.directive('photoDisplay', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: '/templates/photo_display_directive.html',
      scope: {
        photoData: '='
      },
      controller: function($scope) {
        $scope.photoData = $scope.photoData;
      }
    };
  });
};
