(function() {

  "use strict";

  angular
    .module('app-bundle.resources.js.regula-falsi',[
    ])
    .controller('regulaFalsiController', regulaFalsiController);

    regulaFalsiController.$inject = [
      '$scope',
      '$filter',
    ];

    function regulaFalsiController($scope, $filter) {
      var left, mid, right, inv1, eps, fa, fb, fc, range, found, fc2 = 999999999;
      $scope.Math = window.Math;

      function regulaFalsiCalculate(regFal) {
        $scope.Rinfinite = false;
        found = false;
        left = regFal.A * 1;
        right = regFal.B * 1;
        inv1 = regFal.Epsi1 * 1;

        $scope.dataRegula = [
          {
            left: left,
            mid: null,
            right: right,
            fa: null,
            fb: null,
            fc: (found)? 0 : null,
            range: '',
            eps: '',
          }
        ];

        if(!found){
          var z = Math.abs(left - right);
          if(z > inv1)
            rfuNcalc();

          while(fc2 > inv1){
            rfuNcalc();
            $scope.regulaRoot = mid;
            if(found)
              break;
            if($scope.Rinfinite)
              break;
          }
        }

      }

      function rfuNcalc() {
        var i, ii = 0, j;
        for(i = $scope.dataRegula.length - 1; i > 1; i--){
          if(($scope.dataRegula[i].left.toFixed(11) == $scope.dataRegula[i - 1].left.toFixed(11)) && ($scope.dataRegula[i].mid.toFixed(11) == $scope.dataRegula[i - 1].mid.toFixed(11)) && ($scope.dataRegula[i].right.toFixed(11) == $scope.dataRegula[i - 1].right.toFixed(11))) {
            ii++;
            if(ii == 9){
              $scope.Rinfinite = true;
              return $scope.Rinfinite;
            }
          }
          else
            break;
        }
        var fgA = 0, fgB = 0, fgC = 0;
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
        var x, y = $scope.dataRegula.length - 1;
        for (i = 1; i < $scope.bisectFunction.length; i++) {
          x = $scope.bisectFunction[i];
          if(x.p !== 0){
            res.a = left * 1;
            res.b = right * 1;
            for (j = 0; j < Math.abs(x.p) - 1; j++){
              res.a = left * res.a;
              res.b = right * res.b;
            }
            if(x.p > 0){
              res.a = res.a * x.n;
              res.b = res.b * x.n;
            }
            else{
              res.a = x.n / res.a;
              res.b = x.n / res.b;
            }
          }
          else{
            res.a = x.n;
            res.b = x.n;
          }
          fgA += res.a;
          fgB += res.b;
        }
        mid = right - (fgB * (right - left)) / (fgB - fgA);
        $scope.regulaRoot = mid;
        // Cacluate f(c) function
        for(i = 1; i<$scope.bisectFunction.length; i++){
          x = $scope.bisectFunction[i];
          if(x.p !== 0){
            res.c = mid * 1;
            for (j = 0; j < Math.abs(x.p) - 1; j++){
              res.c = mid * res.c;
            }
            if(x.p > 0)
              res.c = res.c * x.n;
            else{
              res.c = x.n / res.c;
            }
          }
          else{
            res.c = x.n;
          }
          fgC += res.c;
        }
        $scope.dataRegula[y].mid = mid;
        $scope.dataRegula[y].fa = fgA.toFixed(11);
        $scope.dataRegula[y].fb = fgB.toFixed(11);
        $scope.dataRegula[y].fc = fgC.toFixed(11);
        fc2 = Math.abs(fgC);

        if(fgA * fgC < 0){
          range = "[left, mid]";
          right = mid;
        }
        else {
          range = "[mid, right]";
          left = mid;
        }
        $scope.dataRegula[y].range = range;
        if(fc2 > inv1)
          $scope.dataRegula.push({left, mid, right});
      }

      function regFalReset() {
        $scope.regFal = {};
        $scope.dataRegula = false;
        $scope.regulaRoot = null;
      }

      $scope.rfuNcalc = rfuNcalc;
      $scope.regulaRoot = '';
      $scope.regFalReset = regFalReset;
      $scope.regulaFalsiCalculate = regulaFalsiCalculate;
    }

})();