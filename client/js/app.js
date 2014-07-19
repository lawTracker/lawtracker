angular.module('lawtracker', [
  'ngRoute',
  'lawtracker.controllers'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/auth', {
      templateUrl: 'partials/auth-view.html',
      controller: 'AuthController'
    })
    .when('/bills/:billId', {
      templateUrl: 'partials/bill-detail.html',
      controller: 'BillDetailController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
