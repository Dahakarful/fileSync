'use strict';
angular.module('FileSync')
  .factory('SocketIOService', ['io', '_', '$timeout', function(io, _, $timeout) {
    var socket = io();
    var _onFileChanged = _.noop;
    var _onVisibilityStatesChanged = _.noop;

    socket.on('connect', function() {
      console.log('connected');
      var login = prompt('Nickname?');
      socket.emit('viewer:new', login);
    });



    socket.on('file:changed', function(filename, timestamp, content) {
      $timeout(function() {
        _onFileChanged(filename, timestamp, content);
      });
    });

    socket.on('users:visibility-states', function(states) {
      $timeout(function() {
        _onVisibilityStatesChanged(states);
      });
    });

    socket.on('error:auth', function(err) {
      // @todo yeurk
      alert(err);
    });
      
      socket.on('history:changed', function(filename, content) {
          $timeout(function() {
              _onHistoryChanged(filename, content);
          })
      })

    return {
      sendMouseMove: function(x, y){
        socket.emit('mirror:mousemove:change', x, y);
      },

      onMouseMoveChange: function(f){
        socket.on('mirror:mousemove:change', function(username, x, y){
          console.log(username, x, y);
          $timeout(function() {
            f(username, x, y);
          });
        });
      },


      sendMessage: function(message){
        socket.emit('chat:message:new', message);
      },

      onNewChatMessage: function(f){
        socket.on('chat:message:new', function(username, message, createdAt){
          console.log(username, message, createdAt);
          $timeout(function() {
            f(username, message, createdAt);
          });
        });
      },

      onViewersUpdated: function(f) {
        socket.on('viewers:updated', f);
      },

      onFileChanged: function(f) {
        _onFileChanged = f;
      },

      onVisibilityStatesChanged: function(f) {
        _onVisibilityStatesChanged = f;
      },

      userChangedState: function(state) {
        socket.emit('user-visibility:changed', state);
      }
    };
  }]);
