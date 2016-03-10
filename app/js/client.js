const angular = require('angular');
const galleryApp = angular.module('galleryApp', []);

require('./services/photo_service')(galleryApp);
require('./controllers/index_controller')(galleryApp);
require('./directives/photo_form_directive')(galleryApp);
require('./directives/photo_display_directive')(galleryApp);
