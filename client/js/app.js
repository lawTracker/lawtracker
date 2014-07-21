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
    .when('/dashboard', {
      templateUrl: 'partials/dashboard-view.html',
      controller: 'DashController'
    })
    .when('/bills/:billId/edit', {
      templateUrl: 'partials/edit-bill.html',
      controller: 'EditBillController'
    })
    .when('/bills/:billId', {
      templateUrl: 'partials/bill-detail.html',
      controller: 'BillDetailController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
