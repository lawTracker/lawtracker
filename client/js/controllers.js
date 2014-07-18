angular.module('lawtracker.controllers', [])

.controller('AuthController', function ($scope, $location) {
  $scope.user = {};

  $scope.signin = function () {
    console.log($scope.user) //sign in through git lab here
    $location.path('/bills');
  };

  $scope.signup = function () {
    console.log($scope.user) //sign up through git lab here

    $location.path('/bills');
  };
});
