var app = angular.module('alquilerById.ctrl', [])
    .controller('alquilerByIdCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        '$routeParams',
        '$location',
        'alquilerService',
        '$timeout',
        function ($scope, $filter, $rootScope, $routeParams, $location, alquilerService, $timeout) {
            $scope.idSearch = location.href.substr(location.href.lastIndexOf('/') + 1);
            $scope.rol = localStorage.getItem('rol');

            $scope.init = function () {
                if ($scope.idSearch != "undefined") {
                    alquilerService.getAlquilerById($scope.idSearch).then(function (response) {
                        $scope.alquiler = response.data.alquiler;
                        $scope.alquiler.fechaValidez = $filter('date')($scope.alquiler.fechaValidez, 'MM/dd/yyyy');
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
                $scope.getUsers();
            }

            $scope.getUsers = function () {
                alquilerService.getAllUsers().then(function (response) {
                    $scope.usuarios = response.data.usuarios;
                    $timeout(function () {
                        $('.select2-basic').select2().trigger('change');
                    }, 600);

                }).catch(function (error) {
                    console.log(error);
                });
            }

            $scope.saveOrUpdate = function () {
                if ($scope.idSearch != "undefined") {
                    alquilerService.putAlquiler($scope.idSearch, $scope.alquiler).then(function (response) {
                        location.href = '/listaAlquiler';
                    }).catch(function (error) {
                        $scope.error = error.data.message;
                        clickModal("error");
                    });
                } else {
                    alquilerService.postAlquiler($scope.alquiler).then(function (response) {
                        location.href = '/listaAlquiler';
                    }).catch(function (error) {
                        $scope.error = error.data.message;
                        clickModal("error");
                    });
                }
            }

        }]);