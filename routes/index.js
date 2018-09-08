'use strict'

const express = require('express')
const AuthCtrl = require('../controllers/auth.js')
const UserCtrl = require('../controllers/user.js')
const AlquilerCtrl = require('../controllers/alquiler.js')
const AccesoCtrl = require('../controllers/acceso.js')
const RecursoCtrl = require('../controllers/recurso.js')
const auth = require('../middlewares/auth.js')
const api = express.Router()


//auth
api.post('/signup', UserCtrl.signUp)
api.post('/signin', UserCtrl.signIn)

//usuario
api.get('/usuarios', auth,UserCtrl.getUsuarios )
api.get('/usuarios/:usuarioId',UserCtrl.getUsuario)
api.post('/usuarios', auth, UserCtrl.saveUsuario)
api.delete('/usuarios/:usuarioId',auth, UserCtrl.deleteUsuario)
api.put('/usuarios/:usuarioId', auth, UserCtrl.updateUsuario)
api.patch('/usuarios/:usuarioId', auth, UserCtrl.patchUsuario)

//alquiler
api.get('/alquileres', auth,AlquilerCtrl.getAlquileres )
api.get('/alquileres/:alquilerId',AlquilerCtrl.getAlquiler)
api.get('/alquileres/:alquilerId/usuarios',AlquilerCtrl.getAlquilerUsuarios) //Todos los usuarios de un alquiler
api.post('/alquileres', auth, AlquilerCtrl.saveAlquiler)
api.delete('/alquileres/:alquilerId',auth, AlquilerCtrl.deleteAlquiler)
api.put('/alquileres/:alquilerId', auth, AlquilerCtrl.updateAlquiler)
api.patch('/alquileres/:alquilerId', auth, AlquilerCtrl.patchAlquiler)

//acceso
api.get('/accesos', auth,AccesoCtrl.getAccesos )
api.get('/accesos/:accesoId',AccesoCtrl.getAcceso)
api.post('/accesos', auth, AccesoCtrl.saveAcceso)
api.put('/accesos/:accesoId', auth, AccesoCtrl.updateAcceso)
api.delete('/accesos/:accesoId',auth, AccesoCtrl.deleteAcceso)

//recurso
api.get('/recursos', auth,RecursoCtrl.getRecursos )
api.get('/recursos/:recursoId',RecursoCtrl.getRecurso)
api.post('/recursos', auth, RecursoCtrl.saveRecurso)
api.put('/recursos/:recursoId', auth, RecursoCtrl.updateRecurso)
api.delete('/recursos/:recursoId',auth, RecursoCtrl.deleteRecurso)



//antes de que se ejecute function, podemos poner cualquier cosa que querramos.
//ejecuta auth.isAuth, si está todo ok, hace next() y pasa a la function de aqui. 
//.isAuth, ahora se saca, porque luego del refactor, queda esa unica funcion.
api.get('/private', auth , (req,res) => {
	res.status(200).send({message: 'Tienes acceso'})
}) //esta ruta es para testear el acceso autorizado.




module.exports = api 