const angular = require('angular');
const templateUrl = '/templates/photo_display_directive.html';
const template = require(__dirname + '/../app/templates/photo_display_directive.html');

describe('Photo display directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('galleryApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the form', () => {
    $httpBackend.whenGET(templateUrl)
      .respond(200, template);

    var element = $compile('<photo-display data-photo-data="{ caption:\'test caption\' }"></photo-display>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test caption');
  });

  it('should be able to submit the form', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET(templateUrl)
      .respond(200, template);

    testScope.testPhoto = { caption: 'from scope' };
    var element = $compile('<photo-display data-photo-data=testPhoto></photo-display>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('from scope');
  });
});
