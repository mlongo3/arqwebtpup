angular.module('perfilUsuario.service', [])
    .factory('perfilUsuarioService', [
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
                getAlquiler: function (id) {
                    return $http({
                        method: 'GET',
                        url: '/api/alquileres/'+ id,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                },
                getManager: function (id) {
                    return $http({
                        method: 'GET',
                        url: '/api/usuarios/'+ id,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                },
                patchUsuario: function (user) {
                    return $http({
                        method: 'PATCH',
                        url: '/api/usuarios/'+ user._id,                        
                        data : user,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        } 
                    });
                },
            };
        }]);
