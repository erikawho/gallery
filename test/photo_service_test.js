const angular = require('angular');

describe('Photo service', () => {
  var $httpBackend, PhotoService;

  beforeEach(angular.mock.module('galleryApp'));

  beforeEach(angular.mock.inject(function(_$httpBackend_, _PhotoService_) {
    $httpBackend = _$httpBackend_;
    PhotoService = _PhotoService_;
  }));

  it('should be a service', () => {
    expect(typeof PhotoService).toBe('object');
    expect(PhotoService.baseUrl).toBe('http://localhost:5000/api/photo');
  });
});
