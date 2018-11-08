var app = angular.module('camara.ctrl', [])
    .controller('camaraCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        '$routeParams',
        '$location',
        'camaraService',
        '$timeout',
        function ($scope, $filter, $rootScope, $routeParams, $location, camaraService, $timeout) {


            $scope.capturarAmbas = function () {
                camaraService.getAmbas().then(function (response) {
                    console.log(response.data);
                    $scope.imagenInternaBuscada = response.data.fotoInterna;
                    $scope.imagenExternaBuscada = response.data.fotoExterna;
                }).catch(function (error) {
                    console.log(error);
                });
            }

            $scope.capturarCamaraInternaOExterna = function (tipoCamara) {
                camaraService.getCamaraInternaOExterna(tipoCamara).then(function (response) {
                    if(tipoCamara == 'int')
                        $scope.imagenInternaBuscada = response.data.fotoInterna;
                    else
                        $scope.imagenExternaBuscada = response.data.fotoExterna;

                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
            }

        }]);