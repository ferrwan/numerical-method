(function() {
	"use strict";

  angular
    .module('app-bundle.resources.js.direct',[
    ])
    .controller('directController', directController);

    directController.$inject = [
      '$scope',
      '$filter',
    ];

    function directController($scope, $filter) {
      var x1, x2, result;

      function directCalculate(direct) {
        $scope.imaginer = false;
        $scope.directInf = false;
        $scope.infinity = false;
        x1 = direct.A.toFixed(12);
        $scope.datad = [{
          x1: x1,
          x2: '-'
        }];

        while(!$scope.imaginer && !$scope.directInf && !$scope.infinity) {
          this.funCalc();
          if($scope.imaginer)
            break;
          if($scope.directInf)
            break;
        }
      }
      function funCalc() {
        var i, ii = 0;
        for(i = $scope.datad.length - 1; i > 1; i--){
          if($scope.datad[i].x1 == $scope.datad[i - 1].x1 && $scope.datad[i].x2 == $scope.datad[i-1].x2){
            ii++;
            if(ii == 2){
              $scope.directInf = true;
              return $scope.directInf;
            }
          }
          else
            break;
        }
        var x, y = $scope.datad.length - 1, resA = 0, pRes;
        for(i = 1; i < $scope.pembilang.length; i++){
          x = $scope.pembilang[i];
          pRes = $scope.datad[y].x1;
          if(x.p !== 0){
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
        resA /= $scope.aa;
        if($scope.powFlag > 1){
          if(resA < 0)
            $scope.imaginer = true;
          resA = Math.pow(resA, 1/$scope.powFlag);
        }
        resA = resA.toFixed(10);
        if(resA == Infinity)
          $scope.infinity = true;
        x1 = resA;
        x2 = Math.abs($scope.datad[y].x1 - x1).toFixed(10);
        $scope.datad.push({x1, x2});
        console.log(x1, x2);
      }

      function addFunct(input){
        var n = input.Num*1, samePow = false, p;
        if(input.Pow < 0 || input.Pow > 0)
          p = input.Pow;
        else
          p = 0;
        for(var i = 1; i<$scope.theFunction.length; i++){
          if($scope.theFunction[i]. p == p){
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

      function getX(){
        var on = false;
        $scope.pembilang = [{}];
        for(var i = 1; i<$scope.theFunction.length; i++){
          var x = $scope.theFunction[i];
          if(!on && i == next && x.p > 0){
            $scope.powFlag = x.p;
            on = true;
            $scope.aa = x.n * -1;
            next+=1;
          }
          else{
            var n = x.n, p = x.p;
            if(x.p <= 0 && next == i)
              next+=1;
            $scope.pembilang.push({n, p});
          }
        }
        next %= $scope.theFunction.length;
        if(next === 0)next+=1;
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
        $scope.datad = $scope.powFlag = $scope.aa = $scope.directInf = $scope.imaginer = null;
      }

      var next = 1;
      $scope.getX = getX;
      $scope.powFlag = null;
      $scope.pembilang = null;
      $scope.aa = null;
      $scope.directCalculate = directCalculate;
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