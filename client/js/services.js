var lawTrackerServices = angular.module('lawtracker.services', []);

lawTrackerServices.factory('Repository', function($http) {
  var createRepository = function(user, repoName) {
    return $http({
      method: 'POST',
      url: '/api/repositories/create',
      data: JSON.stringify({user: user, repositoryName: repoName})
    });
  };

  var getRepositories = function() {
    // stub
  };

  return {
    createRepository: createRepository
  };
});

