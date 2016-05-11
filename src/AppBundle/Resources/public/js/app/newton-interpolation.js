(function() {
  "use strict";

  angular
    .module('app-bundle.resources.js.newton-interpolation',[])
    .controller('newtonInterpolationController',newtonInterpolationController);

    newtonInterpolationController.$inject = [
      '$scope',
      '$filter',
    ];

    function newtonInterpolationController($scope, $filter) {

      $scope.$watch('xPow', function() {
        for(var i = 0; i < $scope.data.length; i++) {
          $scope.data[i].check = false;
        }
      })

      $scope.$watch('data', function() {
        $scope.no = 0;
        for(var i = 0; i < $scope.data.length; i++) {
          if($scope.data[i].check === true) {
              $scope.no++;
          }
        }
      }, true);

      function newtonInterCalc() {
        $scope.b = [];
        var i, j, k;
        for(i=0; i < $scope.pairDefault; i++) {
          $scope.b.push([$scope.data[i].y*1, 0]);
        }
        for(i=1; i < $scope.pairDefault; i++) {
          for(j=0; j < $scope.pairDefault - i; j++) {
            $scope.b[j][i] = ($scope.b[j+1][i-1]*1 - $scope.b[j][i-1]*1)/($scope.data[j+i].x*1 - $scope.data[j].x*1);
            console.log($scope.data[i].b);
          }
        }

        $scope.sum = $scope.b[0][0];
        var suku;
        for(i=1; i < $scope.pairDefault; i++) {
          if($scope.data[i].check === true) {
            suku = $scope.b[0][i]*1;
            for(j=0; j <= i-1; j++) {
              console.log(i+"= "+suku+" * ("+$scope.xAsk+" - "+$scope.data[j].x+")");
              suku = suku * ($scope.xAsk - $scope.data[j].x*1);
            }
            $scope.sum += suku;
          }
        }
        for(i=0; i < $scope.b.length; i++){
          $scope.data[i].b = [];
          for(j=0; j < $scope.b.length; j++){
            if($scope.b[i][j]!=''){
              $scope.data[i].b.push($scope.b[i][j]);
            }
            else{
              $scope.data[i].b.push('-');
            }
          }
        }
      }

      $scope.pairInit = function(num) {
        return new Array(num);
      };

      $scope.pairDefault = 2;
      $scope.data = [
        {
          check: false
        }
      ];
      $scope.opt = [];
      $scope.xPow = 1;
      $scope.newtonInterCalc = newtonInterCalc;
    }

})();