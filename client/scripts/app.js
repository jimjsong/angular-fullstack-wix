'use strict';

angular.module('wixApp', [
    'ngRoute',
    'wix',
    'myHttpServices'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/app.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
