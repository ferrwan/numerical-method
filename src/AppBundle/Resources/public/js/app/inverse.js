(function() {
  "use strict";

  angular
    .module('app-bundle.resources.js.inverse',[])
    .controller('inverseController',inverseController);

    inverseController.$inject = [
      '$scope',
      '$filter',
    ];

    function inverseController($scope, $filter) {
      $scope.getNumber = function(num){
        return new Array(num);
      };
    }

})();