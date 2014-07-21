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
    .when('/bills/create', {
      templateUrl: 'partials/create-bill.html',
      controller: 'CreateBillController'
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
