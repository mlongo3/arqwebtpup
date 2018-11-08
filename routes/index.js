'use strict'

const express = require('express')
const AuthCtrl = require('../controllers/auth.js')
const UserCtrl = require('../controllers/user.js')
const AlquilerCtrl = require('../controllers/alquiler.js')
const AccesoCtrl = require('../controllers/acceso.js')
const RecursoCtrl = require('../controllers/recurso.js')
const PortonCtrl = require('../controllers/porton.js')
const CamaraCtrl = require('../controllers/camara.js')
const LectorCtrl = require('../controllers/lectortarjeta.js')
const LucesCtrl = require('../controllers/luces.js')
const MovimientoCtrl = require('../controllers/movimiento.js')
const RegistroCtrl = require('../controllers/registro.js')
const authe = require('../middlewares/authentication.js')
const autho = require('../middlewares/authorization.js')
const api = express.Router()


//Luces
api.get('/luces/activar',LucesCtrl.activarLuces)
api.get('/luces/desactivar',LucesCtrl.desactivarLuces)
api.get('/luces/activarPrimarias',LucesCtrl.activarLucesPrimarias)
api.get('/luces/desactivarPrimarias',LucesCtrl.desactivarLucesPrimarias)
api.get('/luces/activarSecundarias',LucesCtrl.activarLucesSecundarias)
api.get('/luces/desactivarSecundarias',LucesCtrl.desactivarLucesSecundarias)
api.get('/luces/estadoPrimarias',LucesCtrl.estadoLucesPrimarias)
api.get('/luces/estadoSecundarias',LucesCtrl.estadoLucesSecundarias)

	
//Lector
api.get('/lector/leer',LectorCtrl.LeerTarjeta)


//Registro
api.get('/registros',authe, RegistroCtrl.getRegistros)
api.post('/registros',authe, RegistroCtrl.postRegistro)


//Movimiento
api.get('/movimiento/estado', authe, autho,MovimientoCtrl.getEstado)
api.post('/movimiento/desactivar', authe, autho,MovimientoCtrl.Desactivar)
api.post('/movimiento/activar', authe, autho,MovimientoCtrl.Activar)

//camara
api.post('/camara/capturar',authe, autho,CamaraCtrl.capturarFotos)

//porton - Una vez finalizado cambiar por POST
api.post('/porton/activar',authe, autho,PortonCtrl.activarPorton)
api.get('/porton/getestado',authe, autho,PortonCtrl.getEstado)
api.post('/porton/detener',authe, autho,PortonCtrl.detenerPorton)

//auth
api.post('/signup', AuthCtrl.signUp)
api.post('/signin', AuthCtrl.signIn)

//usuario 
api.get('/usuarios/:userId', authe, autho, UserCtrl.getUsuario )
api.get('/usuarios', authe, autho,UserCtrl.getUsuarios ) //Visibilidad condicional según permisos en Authorization basado en el rol.
api.post('/usuarios', authe, autho, UserCtrl.postUsuario )
api.put('/usuarios/:userId', authe, autho, UserCtrl.putUsuario)
api.patch('/usuarios/:userId', authe, autho, UserCtrl.putUsuario)
api.delete('/usuarios/:userId', authe, autho, UserCtrl.deleteUsuario)
api.patch('/usuarios/:userId/password', authe, autho, UserCtrl.setPassword) 

//recurso
api.get('/recursos', authe, autho,RecursoCtrl.getRecursos )
api.get('/recursos/:recursoId', authe, autho,RecursoCtrl.getRecurso)
api.post('/recursos', authe, autho, RecursoCtrl.postRecurso)
api.put('/recursos/:recursoId', authe, autho, RecursoCtrl.putRecurso)
api.patch('/recursos/:recursoId', authe, autho, RecursoCtrl.putRecurso)
api.delete('/recursos/:recursoId',authe, autho, RecursoCtrl.deleteRecurso)

//acceso
api.get('/accesos', authe, autho,AccesoCtrl.getAccesos )
api.get('/accesos/:accesoId',authe, autho,AccesoCtrl.getAcceso)
api.post('/accesos', authe, autho, AccesoCtrl.postAcceso)
api.put('/accesos/:accesoId', authe, autho, AccesoCtrl.putAcceso)
api.delete('/accesos/:accesoId',authe, autho, AccesoCtrl.deleteAcceso)



//alquiler
api.get('/alquileres', authe, autho,AlquilerCtrl.getAlquileres )
api.get('/alquileres/:alquilerId',authe, autho, AlquilerCtrl.getAlquiler)
//api.get('/alquileres/:alquilerId/usuarios',AlquilerCtrl.getAlquilerUsuarios) //Todos los usuarios de un alquiler
api.post('/alquileres', authe, autho, AlquilerCtrl.postAlquiler)
api.put('/alquileres/:alquilerId', authe, autho, AlquilerCtrl.putAlquiler)
api.patch('/alquileres/:alquilerId', authe, autho, AlquilerCtrl.putAlquiler)
api.delete('/alquileres/:alquilerId',authe, autho, AlquilerCtrl.deleteAlquiler)


//Prueba para testear una ruta privada de acceso con token
api.get('/private', authe, autho, (req,res) => {
	res.status(200).send({message: 'Tenes acceso'})
}) //esta ruta es para testear el acceso autorizado.

module.exports = api 