'use strict'

const express = require('express')
const AuthCtrl = require('../controllers/auth.js')
const UserCtrl = require('../controllers/user.js')
const AlquilerCtrl = require('../controllers/alquiler.js')
const AccesoCtrl = require('../controllers/acceso.js')
const RecursoCtrl = require('../controllers/recurso.js')
const PortonCtrl = require('../controllers/porton.js')
const CamaraCtrl = require('../controllers/camara.js')
const MovimientoCtrl = require('../controllers/movimiento.js')
const auth = require('../middlewares/auth.js')
const autho = require('../middlewares/authorization.js')
const api = express.Router()


//Movimiento
api.get('/movimiento/estado', MovimientoCtrl.getEstado)
api.post('/movimiento/desactivar', MovimientoCtrl.Desactivar)
api.post('/movimiento/activar', MovimientoCtrl.Activar)

//camara
api.post('/camara/capturar',CamaraCtrl.capturarFotos)

//porton - Una vez finalizado cambiar por POST
api.post('/porton/activar',PortonCtrl.activarPorton)
api.get('/porton/getestado',PortonCtrl.getEstado)
api.post('/porton/detener',PortonCtrl.detenerPorton)

//auth
api.post('/signup', AuthCtrl.signUp)
api.post('/signin', AuthCtrl.signIn)

//usuario 
api.get('/usuarios/:userId', auth, UserCtrl.getUsuario )
api.get('/usuarios', UserCtrl.getUsuarios )
api.post('/usuarios', auth, autho, UserCtrl.postUsuario )
api.put('/usuarios/:userId', auth, autho, UserCtrl.putUsuario)
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