(function() {
	"use strict";

  angular
    .module('app-bundle.resources.js.newton-raphson',[
    ])
    .controller('newtonRaphsonController', newtonRaphsonController);

    newtonRaphsonController.$inject = [
      '$scope',
      '$filter',
    ];

    function newtonRaphsonController($scope, $filter) {
      var x1, x2, result;

      function newtonRCalculate(newton) {
        $scope.infinity = false;
        x1 = newtonR.A.toFixed(12);
        $scope.datanr = [{
          x1: x1,
          x2: '-'
        }];

        while(1) {
          this.funCalc();
        }
      }
      function funCalc() {
        var ii = 0;
        for(var i = $scope.datad.length - 1; i > 1; i--){
          if($scope.datad[i].x1 == $scope.datad[i - 1].x1 && $scope.datad[i].x2 == $scope.datad[i-1].x2){
            ii++;
            if(ii == 2){
              ;
            }
          }
          else
            break;
        }
        var x, y = $scope.datad.length - 1, resA = 0, pRes;
        for(var i = 1; i < $scope.pembilang.length; i++){
          x = $scope.pembilang[i];
          pRes = $scope.datad[y].x1;
          if(x.p != 0){
            for(var j = 1;j<x.p;j++)
              pRes *= $scope.datad[y].x1;
            if(x.p > 0)
              pRes *= x.n;
            else
              pRes = x.n / pRes;
          }
          else
            pRes = x.n;
            resA += pRes;
        }
      }

      function addFunct(input){
        var n = input.Num*1, samePow = false;
        if(input.Pow < 0 || input.Pow > 0)
          var p = input.Pow;
        else
          var p = 0;
        for(var i = 1; i<$scope.theFunction.length; i++){
          if($scope.theFunction[i].p == p){
            $scope.theFunction[i].n += n;
            samePow = true;
            break;
          }
        }
        if(!samePow){
          $scope.theFunction.push({n,p});
        }
        $scope.input = {
          Num: 0,
          Pow: 0
        };
      }

      function resetFunct() {
        $scope.theFunction = [
          {
            n: '',
            p: ''
          }
        ];
        $scope.pembilang = null;
      }

      function reset() {
        this.resetFunct();
        $scope.datanr = $scope.aa = null;
      }

      var next = 1;
      $scope.aa = null;
      $scope.addFunct = addFunct;
      $scope.reset = reset;
      $scope.resetFunct = resetFunct;
      $scope.funCalc = funCalc;
      $scope.theFunction = [
        {
          n: '',
          p: ''
        }
      ];
      $scope.funcInput = {
        Num: null,
        Pow: null
      };
    }

})();