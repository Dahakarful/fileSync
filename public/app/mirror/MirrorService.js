'use strict';
angular.module('FileSync')
  .factory('MirrorService', function(SocketIOService, _) {
    var mouses = {
    };

    angular.element(document.body)
      .on('mousemove', _.throttle(function(event) {
        SocketIOService.sendMouseMove(event.pageX, event.pageY);
      }, 100));


    SocketIOService.onMouseMoveChange(function(username, x, y){
      mouses[username] = {left:x, top:y};
    });

    return {
      mouses: mouses
    };
  });
