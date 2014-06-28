'use strict';

angular.module('esvisualizationApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'json-tree',
  'nvd3ChartDirectives'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });