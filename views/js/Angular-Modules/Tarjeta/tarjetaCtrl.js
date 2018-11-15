var app = angular.module('tarjeta.ctrl', [])
    .controller('tarjetaCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        '$routeParams',
        '$location',
        'tarjetaService',
        '$timeout',
        function ($scope, $filter, $rootScope, $routeParams, $location, tarjetaService, $timeout) {

            $scope.leerTarjeta = function () {
                tarjetaService.leerTarjeta().then(function (response) {
                    $scope.respuesta = response.data;
                }).catch(function (error) {                   
                    console.log(error);
                    $scope.respuesta  = error.data; 
                });
            }

        }]);