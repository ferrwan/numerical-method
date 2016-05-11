(function() {
	"use strict";

  angular
    .module('numericApp', [
      'ui.bootstrap',
      'smart-table',

      'app-bundle.resources.js.find-root',
      'app-bundle.resources.js.bisection',
      'app-bundle.resources.js.maclaurin',
      'app-bundle.resources.js.regula-falsi',
      'app-bundle.resources.js.direct',
      'app-bundle.resources.js.newton-raphson',
      'app-bundle.resources.js.inverse',
      'app-bundle.resources.js.cramer',
      'app-bundle.resources.js.direct-interpolation',
      'app-bundle.resources.js.newton-interpolation',
    ]);
})();
