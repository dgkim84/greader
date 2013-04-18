define(
  ['greader/greader.controllers', 'greader/greader.services'],
  function(controllers, services) {
    angular.module('greader', ['greader.services', 'greader.filters'])
      .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/greader', {
          templateUrl: '/greader/templates/main.html',
          controller: controllers.GReaderCtrls
        }).when('/greader/feeds/:feed', {
          templateUrl: '/greader/templates/main.html',
          controller: controllers.GReaderCtrls
        }).otherwise({
          redirectTo: '/greader'
        });
      }]);
  }
)