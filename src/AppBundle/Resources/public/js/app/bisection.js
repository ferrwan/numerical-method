(function() {
	"use strict";

  angular
    .module('app-bundle.resources.js.bisection',[])
    .controller('bisectionController',bisectionController);

    bisectionController.$inject = [
      '$scope',
      '$filter',
    ];

    function bisectionController($scope, $filter) {
      var left, mid, right, inv, eps, fa, fb, fc, range, found;
      function bisectCalculate(bisect) {
        $scope.infinite = false;
        found = false;
        left = bisect.A * 1, right = bisect.B * 1, inv = bisect.Inv * 1;
        mid = (left+right)/2; eps = right-mid;
        found = (mid === 0)? true : false;
        $scope.bisectRoot = mid;
        $scope.datab = [
          {
            left: left,
            mid: mid,
            right: right,
            fa: null,
            fb: null,
            fc: (found)? 0 : null,
            range: '',
            eps: eps
          }
        ];

        if(!found){
          if(eps > inv)
            funCalc();

          while(eps > inv) {
            funCalc();
            $scope.bisectRoot = mid;
            if(found === true)
              break;
            if($scope.infinite)
              break;
          }
        }
      }

      function funCalc() {
        var i, ii = 0;
        for(i = $scope.datab.length - 1; i > 1; i--){
          if(($scope.datab[i].left.toFixed(11) == $scope.datab[i - 1].left.toFixed(11)) && ($scope.datab[i].mid.toFixed(11) == $scope.datab[i - 1].mid.toFixed(11)) && ($scope.datab[i].right.toFixed(11) == $scope.datab[i - 1].right.toFixed(11))) {
            ii++;
            if(ii == 9){
              $scope.infinite = true;
              return $scope.infinite;
            }
          }
          else
            break;
        }
        var f = [
              {
                fa: '',
                fb: '',
                fc: ''
              }
            ];
        var res = {
              a: 1,
              b: 1,
              c: 1
            };

        var x, y;
        for (i = 1; i < $scope.bisectFunction.length; i++) {
          x = $scope.bisectFunction[i];
          y = $scope.datab.length - 1;
          $scope.datab[y].eps = eps;
          if(x.p !== 0){
            res.a = left * 1;
            res.b = right * 1;
            res.c = mid * 1;
            for (var j = 0; j < Math.abs(x.p) - 1; j++){
              res.a = left * res.a;
              res.b = right * res.b;
              res.c = mid * res.c;
            }
            if(x.p > 0){
              res.a = res.a * x.n;
              res.b = res.b * x.n;
              res.c = res.c * x.n;
            }
            else {
              res.a = x.n / res.a;
              res.b = x.n / res.b;
              res.c = x.n / res.c;
            }
          }
          else {
            res.a = x.n;
            res.b = x.n;
            res.c = x.n;
          }
          if(i > 1){
            fa = f[i-1].fa + res.a;
            fb = f[i-1].fb + res.b;
            fc = f[i-1].fc + res.c;
          }
          else{
            fa = res.a;
            fb = res.b;
            fc = res.c;
          }
          f.push({fa, fb, fc});
        }
        var yy = f.length - 1;
        $scope.datab[y].fa = f[yy].fa.toFixed(11);
        $scope.datab[y].fb = f[yy].fb.toFixed(11);
        $scope.datab[y].fc = f[yy].fc.toFixed(11);
        if(fa * fc <= 0){
            range = "[left, mid]";
            right = mid;
        }
        else {
          range = "[mid, right]";
          left = mid;
        }
        mid = (left+right)/2;
        eps = right - mid;
        if(fa.toFixed(11) === 0 || fc.toFixed(11) === 0){
          found = true;
          eps = 0;
        }
        $scope.datab[y].range = range;
        if(eps > inv && eps !== 0){
          $scope.datab.push({left, mid, right});
        }
        else{
          if(!found)
            $scope.datab.push({left, mid, right, eps});
        }
      }

      function bisAddFunct(bis){
        var n = bis.Num*1, samePow = false, p;
        if(bis.Pow < 0 || bis.Pow > 0)
          p = bis.Pow;
        else
          p = 0;
        for(var i = 1; i<$scope.bisectFunction.length; i++){
          if($scope.bisectFunction[i].p == p){
            $scope.bisectFunction[i].n += n;
            samePow = true;
            break;
          }
        }
        if(!samePow)
          $scope.bisectFunction.push({n,p});
        $scope.bis = {
          Num: 0,
          Pow: 0
        };
      }

      function bisectReset() {
        bisResetFunct();
        $scope.bis = {
          Num: 0,
          Pow: 0
        };
        $scope.bisect = {};
        $scope.datab = false;
      };

      function bisResetFunct() {
        $scope.bisectFunction = [{
          n: '',
          p: '',
        }];
      }

      $scope.bisectCalculate = bisectCalculate;
      $scope.bisAddFunct = bisAddFunct;
      $scope.bisResetFunct = bisResetFunct;
      $scope.bisectReset = bisectReset;
      $scope.funCalc = funCalc;
      $scope.bisectRoot = '';
      $scope.bisectFunction = [{
        n: '',
        p: '',
      }];
      $scope.bis = {
        Num: null,
        Pow: null
      };
    }

})();