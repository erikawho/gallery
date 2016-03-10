'use strict';

require(__dirname + '/../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('Index controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('galleryApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var indexController = $ControllerConstructor('indexController', { $scope });
    expect(typeof indexController).toBe('object');
    expect(Array.isArray($scope.index)).toBe(true);
    expect(typeof $scope.photo).toBe('function');
  });

  describe('HTTP requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('indexController', { $scope });
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should GET all photos', () => {
      $httpBackend.expectGET('http://localhost:3000/api/photo').respond(200, [{ caption: 'a photo' }]);
      $scope.photo = [];
      $scope.loadAll();
      $httpBackend.flush();
      expect($scope.photo.length).toBe(1);
      expect($scope.photo[0].caption).toBe('a photo');
    });

    it('should POST a new photo', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/photo', { caption: 'request caption' }).respond(200, { caption 'response caption' });
      $scope.photo = [];
      $scope.newPhoto = { caption: 'new photo caption' };
      $scope.postNew({ caption: 'request caption' });
      $httpBackend.flush();
      expect($scope.photo.length).toBe(1);
      expect($scope.newPhoto).toBe(null);
      expect($scope.photo[0].name).toBe('response caption');
    });

  });
});
