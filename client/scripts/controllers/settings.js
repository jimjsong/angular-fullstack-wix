'use strict';

angular.module('appSettings')
  .controller('SettingsCtrl', function ($scope, $wix, $window) {
    $scope.params = {
      account: 'john@doe.com'
    };

    $wix.UI.initialize({
      numOfImages: 10,
      isIconShown: true,
      imageVisibility: 'show',
      imagesToSync: 0,
      imageMeta: true,
      imageAlt: false,
      imageLink: false,
      borderSize: 10,
      borderRadius: 4,
      myText: 'hello\none\ntwo\nthree'
    });

    $wix.UI.onChange('*', function() {
      var a = Wix.Utils.getOrigCompId();
      console.log('before update', $window.quoteSettings);
      console.log('updating UI',  Wix.UI.toJSON());
      window.quoteSettings = {
        wixUi: Wix.UI.toJSON()
      };
      $wix.Settings.triggerSettingsUpdatedEvent('updated', $wix.Utils.getOrigCompId());
      Wix.Settings.refreshAppByCompIds(a)
    });
  });
