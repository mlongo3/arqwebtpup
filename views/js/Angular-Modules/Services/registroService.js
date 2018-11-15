angular.module('registro.service', [])
    .factory('registroService', [
        '$http',
        function ($http) {
            return {
                getRegistros: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/registros',
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                }
            };
        }]);
