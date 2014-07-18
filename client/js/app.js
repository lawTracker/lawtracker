angular.module('lawtracker', [
  // 'ngRoute',
  'lawtracker.controllers'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/auth', {
      templateUrl: 'partials/auth-view.html',
      controller: 'AuthController'
    })
})
