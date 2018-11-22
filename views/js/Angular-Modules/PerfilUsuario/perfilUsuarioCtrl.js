var app = angular.module('perfilUsuario.ctrl', [])
    .controller('perfilUsuarioCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        '$routeParams',
        '$location',
        'perfilUsuarioService',
        '$timeout',
        function ($scope, $filter, $rootScope, $routeParams, $location, perfilUsuarioService, $timeout) {

            $scope.init = function () {
                $scope.id = localStorage.getItem('_id');
                $scope.getUsuarioById();
            }

            $scope.getUsuarioById = function () {
                perfilUsuarioService.getUsuarioById($scope.id).then(function (response) {
                    $scope.originalUser = angular.copy(response.data.user);
                    $scope.user = response.data.user;
                    $scope.getAlquiler();
                }).catch(function (error) {
                    console.log(error);
                });
            }

            $scope.copyUser = function () {
                $scope.user = $scope.originalUser;
            }

            $scope.getAlquiler = function () {
                if ($scope.user.alquiler != undefined) {
                    perfilUsuarioService.getAlquiler($scope.user.alquiler).then(function (response) {
                        $scope.user.alquilerDesc = response.data.alquiler.nombre;
                        $scope.getManager();
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            }

            $scope.patchUsuario = function () {
                perfilUsuarioService.patchUsuario($scope.user).then(function (response) {
                }).catch(function (error) {
                    console.log(error);
                });
            }

            $scope.getManager = function () {
                if ($scope.user.manager != undefined) {
                    perfilUsuarioService.getManager($scope.user.manager).then(function (response) {
                        console.log(response.data);
                        $scope.user.managerDesc = response.data.user.displayName;
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            }

        }]);