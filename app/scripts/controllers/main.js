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

    $scope.bookGridOptions = {
      data: 'books'
    };

    $scope.userGridOptions = {
      data: 'users'
    }
  });