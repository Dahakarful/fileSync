'use strict';
angular.module('FileSync')
  .controller('ChatCtrl', ['ChatService',
  function (ChatService) {
    this.message = '';
    this.messages = ChatService.messages;

    this.sendMessage = function(){
      if(this.message.trim() === ''){
        return;
      }

      ChatService.sendMessage(this.message);
      this.message = '';
    };
  }
]);
