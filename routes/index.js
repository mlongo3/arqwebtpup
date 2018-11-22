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
const ParadaEmergenciaCtrl = require('../controllers/paradaEmergencia.js')
const authe = require('../middlewares/authentication.js')
const autho = require('../middlewares/authorization.js')
const api = express.Router()


//LUCES
api.post('/luces/activar',LucesCtrl.activarLuces)
api.post('/luces/desactivar',LucesCtrl.desactivarLuces)
api.post('/luces/activarPrimarias',LucesCtrl.activarLucesPrimarias)
api.post('/luces/desactivarPrimarias',LucesCtrl.desactivarLucesPrimarias)
api.post('/luces/activarSecundarias',LucesCtrl.activarLucesSecundarias)
api.post('/luces/desactivarSecundarias',LucesCtrl.desactivarLucesSecundarias)
api.get('/luces/estadoPrimarias',LucesCtrl.estadoLucesPrimarias)
api.get('/luces/estadoSecundarias',LucesCtrl.estadoLucesSecundarias)


//PARADA EMERGENCIA
api.post('/paradaemergencia',authe,ParadaEmergenciaCtrl.parada) 

//Lector
api.get('/lector/leer',LectorCtrl.LeerTarjeta) 


//REGISTROS
api.get('/registros',authe, RegistroCtrl.getRegistros)
api.post('/registros',authe, RegistroCtrl.postRegistro)


//MOVIMIENTO
api.get('/movimiento/estado', authe, autho,MovimientoCtrl.getEstado)
api.post('/movimiento/desactivar', authe, autho,MovimientoCtrl.Desactivar)
api.post('/movimiento/activar', authe, autho,MovimientoCtrl.Activar)

//CAMARA
api.post('/camara/capturar',authe, autho,CamaraCtrl.capturarFotos)

//PORTON
api.post('/porton/activar',authe, autho,PortonCtrl.activarPorton)
api.get('/porton/getestado',authe, autho,PortonCtrl.getEstado)
api.post('/porton/detener',authe, autho,PortonCtrl.detenerPorton)

//AUTH
api.post('/signup', AuthCtrl.signUp)
api.post('/signin', AuthCtrl.signIn)

//USUARIOS
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

//ACCESOS
api.get('/accesos', authe, autho,AccesoCtrl.getAccesos )
api.get('/accesos/:accesoId',authe, autho,AccesoCtrl.getAcceso)
api.post('/accesos', authe, autho, AccesoCtrl.postAcceso)
api.put('/accesos/:accesoId', authe, autho, AccesoCtrl.putAcceso)
api.delete('/accesos/:accesoId',authe, autho, AccesoCtrl.deleteAcceso)



//ALQUILERES
api.get('/alquileres', authe, autho,AlquilerCtrl.getAlquileres )
api.get('/alquileres/:alquilerId',authe, autho, AlquilerCtrl.getAlquiler)
//api.get('/alquileres/:alquilerId/usuarios',AlquilerCtrl.getAlquilerUsuarios) //Todos los usuarios de un alquiler
api.post('/alquileres', authe, autho, AlquilerCtrl.postAlquiler)
api.put('/alquileres/:alquilerId', authe, autho, AlquilerCtrl.putAlquiler)
api.patch('/alquileres/:alquilerId', authe, autho, AlquilerCtrl.putAlquiler)
api.delete('/alquileres/:alquilerId',authe, autho, AlquilerCtrl.deleteAlquiler)


module.exports = api 