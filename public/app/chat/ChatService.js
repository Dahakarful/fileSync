'use strict';
angular
  .module('FileSync')
  .factory('ChatService', ['SocketIOService', function (SocketIOService) {
    var messages = [];

    // from server
    SocketIOService.onNewChatMessage(function(username, message, createdAt){
      messages.push({
        username:username,
        message:message,
        createdAt:createdAt
      });
    });

    return {
      messages:messages,

      // to server
      sendMessage:SocketIOService.sendMessage
    };
  }]);
