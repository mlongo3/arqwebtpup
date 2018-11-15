angular.module('tarjeta.service', [])
    .factory('tarjetaService', [
        '$http',
        function ($http) {
            return {
                leerTarjeta: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/lector/leer',
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                }
            };
        }]);
