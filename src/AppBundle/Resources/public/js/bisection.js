(function() {
	"use strict"

  angular
    .module('app-bundle.resources.js.bisection',[
    ])
    .controller('bisectionController',bisectionController);

    bisectionController.$inject = [
      '$scope',
      '$filter',
    ];

    function bisectionController($scope, $filter) {
      var left, mid, right, inv, eps, fa, fb, fc, range, found;
      function bisectCalculate(bisect) {
        found = false;
        left = bisect.A * 1, right = bisect.B * 1, inv = bisect.Inv * 1;
        mid = (left+right)/2; eps = right-mid;
        $scope.datab = [
          {
            left: left,
            mid: mid,
            right: right,
            fa: '',
            fb: '',
            fc: '',
            range: range,
            eps: eps
          }
        ];

        if(eps > inv)
          funCalc();

        while(eps > inv) {
          funCalc();
          if(found === true)
            break;
        }
      }

      function funCalc() {
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
        for (var i = 1; i < $scope.bisectFunction.length; i++) {
          var x = $scope.bisectFunction[i];
          var y = $scope.datab.length - 1;
          $scope.datab[y].eps = eps;
          if(x.p>0){
            res.a = left * 1;
            res.b = right * 1;
            res.c = mid * 1;
            for (var j = 0; j < x.p - 1; j++){
              res.a = left * res.a;
              res.b = right * res.b;
              res.c = mid * res.c;
            }
            res.a = res.a * x.n;
            res.b = res.b * x.n;
            res.c = res.c * x.n;
          }
          else{
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
        $scope.datab[y].fa = f[yy].fa.toFixed(10);
        $scope.datab[y].fb = f[yy].fb.toFixed(10);
        $scope.datab[y].fc = f[yy].fc.toFixed(10);
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
        if(fa.toFixed(10) == 0 || fc.toFixed(10) == 0){
          found = true;
          eps = 0;
        }
        $scope.datab[y].range = range;
        if(eps > inv && eps != 0){
          $scope.datab.push({left, mid, right});
        }
        else{
          if(!found)
            $scope.datab.push({left, mid, right, eps});
        }
      }

      function bisAddFunct(bisect){
        if(bisect.Pow < 0 || bisect.Pow > 0)
          var p = bisect.Pow;
        else
          var p = 0;
        var n = bisect.Num*1;
        $scope.bisectFunction.push({n,p});
        $scope.bisect = {
          Num: 0,
          Pow: 0
        };
      }

      $scope.bisectCalculate = bisectCalculate;
      $scope.bisAddFunct = bisAddFunct;
      $scope.funCalc = funCalc;
      $scope.bisectFunction = [{
        n: '',
        p: '',
      }];
      $scope.bisect = {
        Num: 0,
        Pow: 0
      };
    }

})();