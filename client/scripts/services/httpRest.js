'use strict';

var quoteHttpServices = angular.module('myHttpServices', []);
quoteHttpServices.service('httpRest', function($http, $window) {

    var baseUrl = 'http://widget.no-ip.biz:9000/';

    var service = {};
    this.getRandomQuote = function(instanceId, instance) {
      return $http.get(baseUrl + 'api/quote?instance=' + instance + "&instanceId=" + instanceId);
    };
});
