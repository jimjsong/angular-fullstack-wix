'use strict';

var myHttpServices = angular.module('myHttpServices', []);
myHttpServices.service('httpRest', function($http) {

    var baseUrl = 'http://localhost:9000/views/hello.html';

    var service = {};
    this.getHello = function() {
        return $http.get(baseUrl);
    };
});