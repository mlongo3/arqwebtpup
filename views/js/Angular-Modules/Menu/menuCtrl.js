var app = angular.module('menu.ctrl', [])
    .controller('menuCtrl', [
        '$scope',
        '$filter',
        '$rootScope',
        function ($scope, $filter, $rootScope) {          
		  $scope.rol = localStorage.getItem('rol');
			
        }]);