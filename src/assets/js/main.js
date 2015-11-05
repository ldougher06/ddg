// MODULE
var ddg = angular.module('ddg', ['ngRoute']);

// ROUTES
ddg.config(function ($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl: './assets/partials/home.html',
    controller: 'homeController'
  })

  .when('/results', {
    templateUrl: './assets/partials/results.html',
    controller: 'resultsController'
  })
});

// SERVICES
ddg.service('searchService', function(){

});

// CONTROLLERS
ddg.controller('homeController', ['$scope', 'searchService',
  function($scope, searchService) {

    // $scope.search = searchService.search;

    $scope.$watch('search', function() {
      searchService.search = $scope.search;
    });

}]);

ddg.controller('resultsController', ['$scope', 'searchService',
  function($scope, searchService) {

    $scope.search = searchService.search;
    $.ajax({
          type: 'GET',
          url: 'https://api.duckduckgo.com/',
          data: { q: $scope.search, format: 'json', pretty: 1},
          jsonpCallback: 'jsonp',
          dataType: 'jsonp',
          skip_disambig: 1
        }).then(function (data) {
            $scope.results = data.RelatedTopics;
            console.log(data.RelatedTopics);
            $scope.$apply();
          });
  }]);


