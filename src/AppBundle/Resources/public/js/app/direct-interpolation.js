(function() {
  "use strict";

  angular
    .module('app-bundle.resources.js.direct-interpolation',[])
    .controller('directInterpolationController',directInterpolationController);

    directInterpolationController.$inject = [
      '$scope',
      '$filter',
    ];

    function directInterpolationController($scope, $filter) {

      $scope.pairInit = function(num) {
        return new Array(num);
      };
      var a;

      $scope.pairDefault = 2;
    }

})();