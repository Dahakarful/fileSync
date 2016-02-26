'use strict';
angular.module('FileSync')
.controller('MirrorCtrl', ['MirrorService',
  function (MirrorService) {
    this.mouses = MirrorService.mouses;
  }
]);
