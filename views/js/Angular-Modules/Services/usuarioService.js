angular.module('usuario.service', [])
    .factory('usuarioService', [
        '$http',
        function ($http) {
            return {
                getAlquileres: function () {
                    return $http({
                        method: 'GET',
                        url:  '/api/alquileres',
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
                getAllUsers: function () {
                    return $http({
                        method: 'GET',
                        url:  '/api/usuarios',
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
                getUsers: function (rol) {
                    return $http({
                        method: 'GET',
                        url:  '/api/usuarios',
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
                getUserById: function (id) {
                    return $http({
                        method: 'GET',
                        url:  '/api/usuarios/' + id,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
                postUsuario: function (user) {
                    return $http({
                        method: 'POST',
                        url:  '/api/usuarios/',
                        data : user,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
                putUsuario: function (id, user) {
                    return $http({
                        method: 'PUT',
                        url:  '/api/usuarios/' + id,
                        data : user,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
                deleteUser: function (id) {
                    return $http({
                        method: 'DELETE',
                        url:  '/api/usuarios/' + id,
                        headers: {
                            'authorization': `Bearer ${localStorage.token}`
                        }
                    });
                },
            };
        }]);
