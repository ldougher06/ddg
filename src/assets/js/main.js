// MODULE
var ddg = angular.module('ddg', ['ngRoute', 'ngResource']);

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

    $scope.search = searchService.search;

    $scope.$watch('search', function() {
      searchService.search = $scope.search;
    });

}]);

ddg.controller('resultsController', ['$scope', '$resource', 'searchService',
  function($scope, $resource, searchService) {

    $scope.search = searchService.search;

    $scope.ddgAPI = $resource("http://api.duckduckgo.com/",
      { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

    $scope.searchResults = $scope.ddgAPI.get({q: $scope.search});

    console.log($scope.searchResults);
}]);


