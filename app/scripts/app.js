'use strict';

/**
 * @ngdoc overview
 * @name prismSampleProjectApp
 * @description
 * # prismSampleProjectApp
 *
 * Main module of the application.
 */
angular
  .module('prismSampleProjectApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngGrid'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
