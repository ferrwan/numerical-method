(function() {
  "use strict";

  angular
    .module('app-bundle.resources.js.cramer',[])
    .controller('cramerController',cramerController);

    cramerController.$inject = [
      '$scope',
      '$filter',
    ];

    function cramerController($scope, $filter) {
      $scope.getNumber = function(num){
        for(var i=0; i<num; i++){
          $scope.alpha.push(String.fromCharCode(i+65));
        }
        return new Array(num);
      };

      $scope.alpha = [];

    }

})();