'use strict';
angular.module('FileSync').controller('HistoryCtrl', ['HistoryService', 'VisibilityService',
  function (HistoryService, VisibilityService, fs) {
    this.edits = HistoryService.edits;
    this.visibility = VisibilityService;

    this.remove = function (edit) {
      HistoryService.remove(edit);
    };
      
      this.loadHistory = function () {
          HistoryService.loadHistory();
      }  
  }
]);