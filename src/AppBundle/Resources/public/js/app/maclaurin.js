(function() {

  "use strict";

  angular
    .module('app-bundle.resources.js.maclaurin',[
    ])
    .controller('maclaurinController', maclaurinController);

    maclaurinController.$inject = [
      '$scope',
      '$filter',
    ];

    function maclaurinController($scope, $filter) {

      function factorial(n) {
        if(n <= 1)
          return n;
        return n * factorial(n-1);
      }

      function macCalculate(mac){
        var pow1 = 2, pow2 = 3, pow3 = 1, cx, nx, ex, flag = true;
            $scope.radian = mac.Degree/180*Math.PI;
        $scope.rad = {
          cos: Math.cos($scope.radian),
          sin: Math.sin($scope.radian),
          exp: Math.exp($scope.radian)
        };
        $scope.dataMac = [
          {
            cx: Math.cos(0),
            nx: $scope.radian,
            ex: Math.exp(0)
          }
        ];

        $scope.macTotal = {
          total1: Math.cos(0),
          total2: $scope.radian,
          total3: Math.exp(0)
        };

        var i, j;
        for(i=0; i < mac.Iteration; i++){
          cx = nx = ex = $scope.radian;
          for(j=0; j < pow1 - 1; j++){
            cx *= $scope.radian;
          }
          for(j=0; j < pow2 - 1; j++){
            nx *= $scope.radian;
          }
          for(j=0; j < pow3 - 1; j++){
            ex *= $scope.radian;
          }
          cx = cx / factorial(pow1);
          nx = nx / factorial(pow2);
          ex = ex / factorial(pow3);
          if(flag){
            cx *= -1;
            nx *= -1;
            flag = false;
          }
          else
            flag = true;
          pow1 += 2;
          pow2 += 2;
          pow3 += 1;
          $scope.dataMac.push({cx, nx, ex});
          $scope.macTotal.total1 += cx;
          $scope.macTotal.total2 += nx;
          $scope.macTotal.total3 += ex;
        }
      }

      function macReset() {
        $scope.radian = null;
        $scope.dataMac = false;
        $scope.rad = $scope.macTotal = $scope.mac = {};
        $scope.viewBy = 'cos';
      }

      $scope.macCalculate = macCalculate;
      $scope.factorial = factorial;
      $scope.macReset = macReset;
    }


})();