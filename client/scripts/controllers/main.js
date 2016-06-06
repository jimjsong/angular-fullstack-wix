'use strict';

angular.module('wixApp')
  .controller('MainCtrl', function ($scope, $wix, httpRest, $window) {

    var instanceId,
        instance;

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

    httpRest.getHello(instanceId, instance).then(function(res){
      console.log('window quote settings', $window.quoteSettings);
      $scope.helloValue = res.data;
      console.log(res.data);
    }).catch(function(err) {
      console.log(err);
    });

  });
