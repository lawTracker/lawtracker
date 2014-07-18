angular.module('lawtracker', [
  'lawTrackerControllers',
  // 'lawtracker.auth',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController'
    })
    .when('/bills/:billId', {
      templateUrl: 'app/partials/bill-detail.html',
      controller: 'BillDetailController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

