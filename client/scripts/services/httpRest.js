'use strict';

var myHttpServices = angular.module('myHttpServices', []);
myHttpServices.service('httpRest', function($http) {

    var baseUrl = 'http://localhost:9000/';

    var service = {};
    this.getHello = function(instanceId, instance) {
        return $http.get(baseUrl + 'api/quote?instance=' + instance + "&instanceId=" + instanceId);
    };
});
