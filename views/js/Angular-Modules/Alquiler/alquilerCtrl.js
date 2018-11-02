var app = angular.module('alquiler.ctrl', [])
    .controller('alquilerCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        '$routeParams',
        '$location',
        'alquilerService',
        '$timeout',
        function ($scope, $filter, $rootScope, $routeParams, $location, alquilerService, $timeout) {

            $scope.init = function () {
                $scope.getAlquileres();
            }

            $scope.getAlquileres = function () {
                alquilerService.getAlquileres().then(function (response) {
                    $scope.alquileres = response.data.Alquileres;
                    angular.forEach($scope.alquileres, function (key) {
                        alquilerService.getUsuarioById(key.usuarioResp).then(function (response) {
                            key.usuarioResponsableDesc = response.data.user.displayName;
                        }).catch(function (error) {
                            console.log(error);
                        });
                    })
                }).catch(function (error) {
                    console.log(error);
                });
            }

            $scope.delete = function(id){
                alquilerService.deleteAlquiler(id).then(function (response) {
                   $scope.init();
                }).catch(function (error) {
                    console.log(error);
                });
            }

        }]);