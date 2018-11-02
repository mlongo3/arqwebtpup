angular.module('alquiler.service', [])
    .factory('alquilerService', [
        '$http',
        function ($http) {
            return {
                getUsuarioById: function (id) {
                    return $http({
                        method: 'GET',
                        url: '/api/usuarios/'+ id,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                },
                getAlquilerById: function (id) {
                    return $http({
                        method: 'GET',
                        url: '/api/alquileres/'+ id,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                },
                getAlquileres: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/alquileres/',
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                },
                getAllUsers: function (rol) {
                    return $http({
                        method: 'GET',
                        url:  '/api/usuarios',
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
                postAlquiler: function (alquiler) {
                    return $http({
                        method: 'POST',
                        url:  '/api/alquileres/',
                        data : alquiler,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
                putAlquiler: function (id, alquiler) {
                    return $http({
                        method: 'PUT',
                        url:  '/api/alquileres/' + id,
                        data : alquiler,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
                deleteAlquiler: function (id) {
                    return $http({
                        method: 'DELETE',
                        url:  '/api/alquileres/' + id,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
            };
        }]);
