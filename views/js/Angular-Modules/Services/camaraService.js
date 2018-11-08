angular.module('camara.service', [])
    .factory('camaraService', [
        '$http',
        function ($http) {
            return {
                getCamaraInternaOExterna: function (tipoCamara) {
                    return $http({
                        method: 'POST',
                        url: '/api/Camara/capturar?camara='+ tipoCamara,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                },
                getAmbas: function (id) {
                    return $http({
                        method: 'POST',
                        url: '/api/Camara/capturar',
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                },
            };
        }]);
