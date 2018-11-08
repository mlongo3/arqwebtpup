angular.module('Menu', [
    'menu.ctrl',
    'ngRoute',
    'ngAnimate',
    'mgcrea.ngStrap',
    'ngSanitize',
]).config([
    '$routeProvider',
    '$locationProvider',
    "$httpProvider",
    '$compileProvider',
    '$interpolateProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $compileProvider, $interpolateProvider) {
        $locationProvider.hashPrefix('');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');

        var regexIso8601 = /\/Date\((\d*)\)\//;

        $httpProvider.defaults.transformResponse.push(function (responseData) {
            convertDateStringsToDates(responseData);
            return responseData;
        });

        function convertDateStringsToDates(input) {
            // Ignore things that aren't objects.
            if (typeof input !== "object") return input;


            for (var key in input) {
                if (!input.hasOwnProperty(key)) continue;
                var value = input[key];
                var match;
                // Check for string properties which look like dates.
                // TODO: Improve this regex to better match ISO 8601 date strings.
                if (typeof value === "string" && (match = value.match(regexIso8601))) {
                    // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.   
                    var milliseconds = new Date(parseInt(match[1]));

                    if (!isNaN(milliseconds)) {

                        var d = new Date(milliseconds);
                        var day = d.getUTCDate().toString().length == 1 ? '0' + parseInt(d.getUTCDate()) : d.getUTCDate();
                        var month = d.getUTCMonth().toString().length == 1 ? '0' + parseInt(d.getUTCMonth() + 1) : d.getUTCMonth() + 1;
                        var year = d.getUTCFullYear();
                        var hours = d.getUTCHours();
                        var minutes = d.getUTCMinutes();
                        var result = d;
                        input[key] = result;
                    }
                } else if (typeof value === "object") {
                    // Recurse into object
                    convertDateStringsToDates(value);
                }
            }
        };

    }
]).run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function () {
        setTimeout(pageSetUp, 200);
    });
    }]);