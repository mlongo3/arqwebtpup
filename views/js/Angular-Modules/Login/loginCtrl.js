var app = angular.module('login.ctrl', [])
    .controller('loginCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        '$routeParams',
        '$location',
        'loginService',
        '$timeout',
        function ($scope, $filter, $rootScope, $routeParams, $location, loginService, $timeout) {
          
		  
			$scope.login = function () {
                loginService.login($scope.user).then(function (response) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('rol', response.data.rol)
                    localStorage.setItem('displayName', response.data.displayName)
                    localStorage.setItem('_id', response.data._id)
                    location.assign('/listausuarios');
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }]);