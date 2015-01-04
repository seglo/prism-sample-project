'use strict';

/**
 * @ngdoc function
 * @name prismSampleProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the prismSampleProjectApp
 */
angular.module('prismSampleProjectApp')
  .controller('MainCtrl', function($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/users'
    }).then(function(result) {
      $scope.users = result.data;
    });

    $http({
      method: 'GET',
      url: '/api/books'
    }).then(function(result) {
      $scope.books = result.data;
    });

    $http({
      method: 'GET',
      url: '/api/bookauthors' // tests rewrite rule
    }).then(function(result) {
      $scope.authors = result.data;
    },function(err) {
      console.log('err', err);
      $scope.showError = true;
      $scope.errorMessage = err.data;
    });

    // the following 3 calls don't do anything with results
    // they're just to demonstrate the .404 stub creation and 
    // rewrite rules
    // $http({
    //   method: 'GET',
    //   url: '/api/newendpoint'
    // });

    // $http({
    //   method: 'GET',
    //   url: '/api/authors?foo=value'
    // });

    // $http({
    //   method: 'GET',
    //   url: '/api/authors?bar=value'
    // });

    $scope.bookGridOptions = {
      data: 'books'
    };

    $scope.userGridOptions = {
      data: 'users'
    };

    $scope.authorsGridOptions = {
      data: 'authors'
    };
  });