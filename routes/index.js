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
api.post('/signup', AuthCtrl.signUp)
api.post('/signin', AuthCtrl.signIn)

//usuario
api.get('/usuarios/:userId', auth, UserCtrl.getUsuario )
api.get('/usuarios', auth, UserCtrl.getUsuarios )
api.post('/usuarios', auth, UserCtrl.postUsuario )
api.put('/usuarios/:userId', auth, UserCtrl.putUsuario)
api.patch('/usuarios/:userId', auth, UserCtrl.putUsuario)
api.delete('/usuarios/:userId', auth, UserCtrl.deleteUsuario)

//recurso
api.get('/recursos', auth,RecursoCtrl.getRecursos )
api.get('/recursos/:recursoId', auth,RecursoCtrl.getRecurso)
api.post('/recursos', auth, RecursoCtrl.postRecurso)
api.put('/recursos/:recursoId', auth, RecursoCtrl.putRecurso)
api.patch('/recursos/:recursoId', auth, RecursoCtrl.putRecurso)
api.delete('/recursos/:recursoId',auth, RecursoCtrl.deleteRecurso)

//acceso
api.get('/accesos', auth,AccesoCtrl.getAccesos )
api.get('/accesos/:accesoId',auth,AccesoCtrl.getAcceso)
api.post('/accesos', auth, AccesoCtrl.postAcceso)
api.put('/accesos/:accesoId', auth, AccesoCtrl.putAcceso)
api.delete('/accesos/:accesoId',auth, AccesoCtrl.deleteAcceso)



//alquiler
api.get('/alquileres', auth,AlquilerCtrl.getAlquileres )
api.get('/alquileres/:alquilerId',AlquilerCtrl.getAlquiler)
//api.get('/alquileres/:alquilerId/usuarios',AlquilerCtrl.getAlquilerUsuarios) //Todos los usuarios de un alquiler
api.post('/alquileres', auth, AlquilerCtrl.postAlquiler)
api.put('/alquileres/:alquilerId', auth, AlquilerCtrl.putAlquiler)
api.patch('/alquileres/:alquilerId', auth, AlquilerCtrl.putAlquiler)
api.delete('/alquileres/:alquilerId',auth, AlquilerCtrl.deleteAlquiler)


//Prueba para testear una ruta privada de acceso con token
api.get('/private', auth , (req,res) => {
	res.status(200).send({message: 'Tenes acceso'})
}) //esta ruta es para testear el acceso autorizado.



module.exports = api 