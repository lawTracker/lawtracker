angular.module('lawtracker', [
  'lawtracker.bill',
  'lawtracker.bills',
  'lawtracker.auth',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController'
    })
})
