'use strict';
angular.module('FileSync')
.directive('ngMouseUpdate', function() {
  return {
    restrict: 'A',
    scope: {
      position: '=position'
    },
   link: function(scope, element, attrs){
     scope.$watch(attrs.position, function(value) {
       element[0].style.left = value.left+'px';
       element[0].style.top = value.top+'px';
     });
   }
  };

});
