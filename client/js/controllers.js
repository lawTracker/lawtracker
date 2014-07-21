var lawTrackerControllers = angular.module('lawtracker.controllers', [
  'lawtracker.services'
]);

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

lawTrackerControllers.controller('DashController', function ($scope, $http, $routeParams) {
  $scope.userContributions = [];
  $scope.userBills = [];
  $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
    console.log(data)
    $scope.userContributions = data;
    $scope.userBills = data;
  })

});

lawTrackerControllers.controller('BillDetailController', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $scope.bill = {id: $routeParams.billId};

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

lawTrackerControllers.controller('BillRevisionsController', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $scope.bill = {id: $routeParams.billId};
    $scope.revisions = {};

    // TODO: Pass in the user dynamically

    $scope.user = {username: 'user', id: 1};

    $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '/repository/commits?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
      $scope.revisions = data;
    })
    .error(function(err) {
      console.log(err)
    });

}]);

lawTrackerControllers.controller('ViewRevisionController', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $scope.bill = {id: $routeParams.billId};

    $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '/repository/commits/' + $routeParams.sha + '/diff?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
      $scope.bill.diff = data[0].diff;
    })
    .error(function(err) {
      console.log(err)
    });

}]);

lawTrackerControllers.controller('CreateBillController', ['$scope', '$http', '$routeParams', 'Repository',
  function($scope, $http, $routeParams, Repository) {
    $scope.bill = {};
    // Hardcode this for now...once we get login working we should know who
    // the user is and be able to access info via the api endpoint
    $scope.user = {username: 'user', id: 1};
    // we'll take the filename from the form, sanitize it, and use it for
    // creating the repo

    $scope.master = $scope.bill;

    $scope.create = function(bill) {
      $scope.master = angular.copy(bill);
      Repository.createRepository($scope.user, $scope.bill.filename);
    };

    $scope.reset = function() {
      $scope.bill = angular.copy($scope.master);
    };

    $scope.reset();

}]);

lawTrackerControllers.controller('EditBillController', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $scope.bill = {};
    // Hardcode this for now...once we get login working we should know who
    // the user is and be able to access info via the api endpoint
    $scope.user = {username: 'user', id: 1};
    $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
      // console.log(data);
      $scope.bill.id = data.id;
      $scope.bill.description = data.description;
    })
    .error(function(err) {
      console.log(err)
    });

    $http.get('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + $routeParams.billId + '/repository/tree?private_token=AGrAjazL79tTNqJLeABp').success(function(data) {
      var repoTree = data;
      var repoSha = data[0].id;
      $scope.bill.fileName = data[0].name;

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
      var file_path, branch_name, content, commit_message;
      var commitMsg = bill.commitMsg || "Updated at " + Date.now();

      $http.put('http://bitnami-gitlab-b76b.cloudapp.net/api/v3/projects/' + bill.id + '/repository/files?private_token=AGrAjazL79tTNqJLeABp', {'id': $scope.bill.id, 'content': $scope.bill.content, 'file_path': $scope.bill.fileName, 'branch_name': 'master', 'commit_message': commitMsg}).success(function(data) {
        console.log("here's what we got back after trying to edit the file via the web api");
        console.log(data);

      $scope.master = angular.copy(bill);
      }).error(function(err) {
        console.log("got an error when trying to update the bill");
        console.log(err);
      });
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
