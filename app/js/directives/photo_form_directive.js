module.exports = function(app) {
  app.directive('photoForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: '/templates/photo_form_directive.html',
      scope: {
        formSubmit: '&',
        newPhoto: '='
      },
      controller: function($scope) {
        $scope.newPhoto = $scope.newPhoto;
      }
    };
  });
};
