'use strict'

const Record = require('../models/registro.js')
const User = require('../models/user.js')
/*

Quiero obtener:
- Todos
- userId
- alquilerId
- tipo //info, advertencia, error, etc.
- recursoNombre
- time
- autorizado //Ejemplo, todos los no autorizados.

*/

function getRegistros(req,res){
	console.log('getRegistros')
	Record.find({}, (err,registros) => {		
			if (err)  return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if (!registros) return res.status(404).send({message: 'No existen registros'})
			res.status(200).send({registros})
		}).populate('userId','displayName')
}

function postRegistro(req,res){
	console.log('postRegistro')
	
	
	User.findById(req.user, (err,usuario) => {
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
		if(!usuario){
			//se debe generar codigo para cuando es una petición de un usuario inexistente.
		}

		//parametros esperados. recurso,accion,auth,tipo,descr,evtid 
		
		const registro = new Record({
			userId: usuario._id, 
			email: usuario.email,	
			managerId: usuario.manager,
			alquilerId: usuario.alquiler,		
			recursoNombre: req.query.recurso,
			accion: req.query.accion,
			autorizado: req.query.auth,
			tipo: req.query.tipo,
			descripcion: req.query.descr,
			eventID: req.query.evtid
		})
		registro.save( (err,recStored) => {		
			if(err) return res.status(500).send({message:`Error al guardar en la base de datos: ${err}`})
			res.status(201).send({record: recStored})
		}) 
					
	})	
}

function newRegistro(user,recurso,accion,auth,tipo,descr,evtid){
	console.log('newRegistro')	
	
	if(user==null){
		console.log('No hay usuario')
		const registro = new Record({
				userId: 'null', 
				email: 'null',	
				managerId: 'null',
				alquilerId: 'null',		
				recursoNombre: recurso,
				accion: accion,
				autorizado: auth,
				tipo: tipo,
				descripcion: descr,
				eventID: evtid
		})
		registro.save( (err,recStored) => {		
			if(err){
				console.log(err)
			} 
			else{
				console.log('registro guardado')	
			}			
		}) 
	}
	else{
		User.findById(user, (err,usuario) => {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if(!usuario){
				//se debe generar codigo para cuando es una petición de un usuario inexistente.
			}

			//parametros esperados. recurso,accion,auth,tipo,descr,evtid 
			if(!usuario.alquiler){usuario.alquiler = null}
			console.log(`el registro tendra como alquiler:${usuario.alquiler}`)
		
			const registro = new Record({
				userId: usuario._id, 
				email: usuario.email,	
				managerId: usuario.manager,
				alquilerId: usuario.alquiler,		
				recursoNombre: recurso,
				accion: accion,
				autorizado: auth,
				tipo: tipo,
				descripcion: descr,
				eventID: evtid
			})
			registro.save( (err,recStored) => {		
				if(err){
					console.log(err)
				} 
				else{
					console.log('registro guardado')	
				}			
			}) 
						
		})
	}	
}

module.exports = {
	getRegistros,
	postRegistro,
	newRegistro
}