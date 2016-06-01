'use strict';

angular.module('wixApp', [
    'ngRoute',
    'wix',
    'myHttpServices'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/hello', {
            template: 'views/hello.html',
            controller: 'MainCtrl'
        })
        .when('/', {
        templateUrl: 'views/app.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });