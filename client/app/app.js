angular.module('lawtracker', [
  // 'lawtracker.bill',
  // 'lawtracker.bills',
  'lawtracker.auth',
  // 'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/auth', {
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController'
    })
})
