var app = angular.module('usuarioById.ctrl', [])
    .controller('usuarioByIdCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        '$routeParams',
        '$location',
        'usuarioService',
        '$timeout',
        function ($scope, $filter, $rootScope, $routeParams, $location, usuarioService, $timeout) {
          $scope.idSearch = location.href.substr(location.href.lastIndexOf('/') + 1);
		  $scope.rol = localStorage.getItem('rol');
			$scope.init = function () {
               if($scope.idSearch != "undefined"){
                    usuarioService.getUserById($scope.idSearch).then(function (response) {
                        $scope.user = response.data.user;
                        $scope.user.repassword = $scope.user.password;
                    }).catch(function (error) {
                        console.log(error);
                    });                        
               }
               $scope.getManagers();
            }

            $scope.getManagers = function(){
                usuarioService.getAllUsers().then(function (response) {
                    $scope.managers = response.data.usuarios;
                    if($scope.user.manager != undefined){
                        $scope.user.user = $scope.user.manager;
                        $timeout(function () {
                            $('.select2-basic').select2().trigger('change');
                        },600);
                    }
                }).catch(function (error) {
                    console.log(error);
                });    
                
            }

            $scope.saveOrUpdate = function() {
                if($scope.user.password == $scope.user.repassword){
                    if( $scope.idSearch != "undefined") {
                        usuarioService.putUsuario($scope.idSearch, $scope.user).then(function (response) {
                            $scope.user = response.data.user;
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }else{
                        usuarioService.postUsuario($scope.user).then(function (response) {
                            $scope.user = response.data.user;
                        }).catch(function (error) {
                                console.log(error);
                        });
                    }
                }
            }
        }]);