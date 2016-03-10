const angular = require('angular');
const templateUrl = '/templates/photo_form_directive.html';
const template = require('/../app/templates/dogs/directives/photo_form_directive.html');

describe('Photo form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('galleryApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the form', () => {
    $httpBackend.when('GET', '/templates/photo_form_directive.html').respond(200, template);

    var element = $compile('<photo-form data-new-photo="{}" data-button-text="Submit photo"></photo-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('Submit photo');
  });

  it('should be able to submit the form', () => {
    var testScope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/photo_form_directive.html').respond(200, template);

    var called = false;
    testScope.testSubmit = (formData) => {
      expect(formData.caption).toBe('called from scope');
      called = true;
    };

    var element = $compile('<photo-form data-new-photo="{}" data-form-submit=testSubmit></photo-form>')(testScope);
    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().formSubmit(testScope)({caption: 'called from scope'});
    expect(called).toBe(true);
  });
});
