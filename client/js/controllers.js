var lawTrackerControllers = angular.module('lawtracker.controllers', []);

lawTrackerControllers.controller('AuthController', function ($scope, $location) {
  $scope.user = {};

  $scope.signin = function () {
    console.log($scope.user) //sign in through git lab here
    $location.path('/dashboard');
  };

  $scope.signup = function () {
    console.log($scope.user) //sign up through git lab here

    $location.path('/dashboard');
  };
});

lawTrackerControllers.controller('DashController', function ($scope, $location) {
});

lawTrackerControllers.controller('BillDetailController', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];
    // $http.defaults.headers.common.PRIVATE-TOKEN = 'AGrAjazL79tTNqJLeABp';
    // $httpProvider.defaults.headers.get = {'PRIVATE-TOKEN': 'AGrAjazL79tTNqJLeABp'};
    $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
      $scope.bill = data;
    })
    .error(function(err) {
      console.log(err)
    });

    $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '/repository/tree?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
      var repoTree = data;
      var repoSha = data[0].id;
      var fileName = data[0].name;

      $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '/repository/raw_blobs/' + repoSha + '?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
        $scope.bill.content = data;
      })
      .error(function(err) {
        console.log(err)
      });
    })
    .error(function(err) {
      console.log(err)
    });

}]);

lawTrackerControllers.controller('EditBillController', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $scope.bill = {};

    $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
      console.log(data);
      $scope.bill.id = data.id;
      $scope.bill.description = data.description;
    })
    .error(function(err) {
      console.log(err)
    });

    $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '/repository/tree?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
      var repoTree = data;
      var repoSha = data[0].id;
      var fileName = data[0].name;

      $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '/repository/raw_blobs/' + repoSha + '?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
        $scope.bill.content = data;
      })
      .error(function(err) {
        console.log(err)
      });
    })
    .error(function(err) {
      console.log(err)
    });

    $scope.master = $scope.bill;

    $scope.update = function(bill) {
      $scope.master = angular.copy(bill);
    };

    $scope.reset = function() {
      $scope.bill = angular.copy($scope.master);
    };

}]);

// Kanged from https://stackoverflow.com/a/2919363
// function nl2br (str, is_xhtml) {
//   var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
//   return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
// }
function nl2br (str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}
