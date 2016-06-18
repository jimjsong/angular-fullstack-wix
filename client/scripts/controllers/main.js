'use strict';

angular.module('wixApp')
  .controller('MainCtrl', function ($scope, $wix, httpRest, $window, $rootScope) {

    var instanceId,
        instance;
    var C_TIMEOUT = 5 * 60000; // Every 5 minutes

    $scope.handleEvent = function(event) {
      $scope.$apply(function() {
        $scope.message = event;
      });
    };

    $wix.addEventListener($wix.Events.SETTINGS_UPDATED, $scope.handleEvent);

    if ($wix.Utils.getViewMode() !== 'standalone') {

      instanceId =  $wix.Utils.getInstanceId();
      instance = $wix.Utils.getInstance();
      $scope.instanceId = instanceId;
      $scope.instance = instance;
    }

    function getRandomQuote() {
      httpRest.getRandomQuote(instanceId, instance).then(function(res){
        $scope.helloValue = res.data;
        // hate this but it only seems to work with a delay
        setTimeout(function() {$rootScope.$emit("heightResize");}, 0);

      }).catch(function(err) {
        console.log(err);
      });
    }

    setInterval(getRandomQuote, C_TIMEOUT);

    getRandomQuote();

  }).directive('fixHeight',function($window, $rootScope){
  return {
    link: function(scope,element,attr){
      //here you should be aware of possibility to
      //use jqLite to set or get your height like in jquery
      $rootScope.$on('heightResize', function() {
        var getHeight = element.prop('offsetHeight');
        Wix.setHeight(getHeight);
      });
    }
  }
});
