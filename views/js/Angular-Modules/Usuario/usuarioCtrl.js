var app = angular.module('usuario.ctrl', [])
    .controller('usuarioCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        '$routeParams',
        '$location',
        'usuarioService',
        '$timeout',
        function ($scope, $filter, $rootScope, $routeParams, $location, usuarioService, $timeout) {
            $scope.users = [];
            $scope.userRol = localStorage.getItem('rol');
		  
			$scope.init = function () {
                usuarioService.getUsers(localStorage.getItem('rol')).then(function (response) {
                 $scope.users = response.data.usuarios;
                }).catch(function (error) {
                    console.log(error);
                });
            }

            $scope.delete = function(id) {
                usuarioService.deleteUser(id).then(function (response) {
                    $scope.init();
                }).catch(function (error) {
                        console.log(error);
                });
            }

            $scope.inhabilitar = function(user) {
                user.habilitado = !user.habilitado;
                usuarioService.putUsuario(user._id, user).then(function (response) {
                    $scope.init();
                }).catch(function (error) {
                        console.log(error);
                });
            }
        }]);