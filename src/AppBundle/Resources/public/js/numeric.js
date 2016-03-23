(function() {
	"use strict"

  angular
    .module('numericApp', [
      'app-bundle.resources.js.bisection',
    ])
    .controller('numericController',numericController);

    numericController.$inject = [
      '$scope',
    ];

    function numericController($scope) {
      function sqrtCalculate(N) {
        if(N && N > 0){
          var S = 1, T = N/S, eps = Math.abs(T-S);
          $scope.datas = [
            {
              S: 1,
              T: T,
              eps: eps,
            }
          ];
          while(eps > 123e-10) {
            S = (S+T)/2;
            T = N/S;
            eps = Math.abs(T-S);
            $scope.datas.push({S,T,eps});
          }
          $scope.sqrtResult = S;
        }
      }

      function reset() {
        $scope.sqrtInput = 0;
        $scope.datas = [{}];
        $scope.sqrtResult = 0;
      }

      $scope.reset = reset;
      $scope.sqrtCalculate = sqrtCalculate;
    }
    
})();