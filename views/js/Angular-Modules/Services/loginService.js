angular.module('login.service', [])
    .factory('loginService', [
        '$http',
        function ($http) {
            return {
                login: function (loginDTO) {
                    return $http({
                        method: 'POST',
                        url: '/api/signin',
                        data: loginDTO 
                    });
                },
                signOut: function () {
                    return $http({
                        method: 'GET',
                        url:'/api/signout',
                    });
                },
            };
        }]);
