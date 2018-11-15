var app = angular.module('registro.ctrl', [])
    .controller('registroCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        '$routeParams',
        '$location',
        'registroService',
        '$timeout',
        function ($scope, $filter, $rootScope, $routeParams, $location, registroService, $timeout) {

            $scope.init = function () {
                $scope.getRegistros();
            }

            $scope.getRegistros = function () {
                registroService.getRegistros().then(function (response) {
                    $scope.registros = response.data.registros;
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
            }

        }]);