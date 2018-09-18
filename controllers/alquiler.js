'use strict'

const Alquiler = require('../models/alquiler.js')

function getAlquileres(req,res){	
	if(req.query.usuario){
		console.log('getAlquileresByUsuarioResp')
		let usuarioResp = req.query.usuarioResp	
		Alquiler.findByUsuarioResp(usuarioResp, function (err,alquiler) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!alquiler) return res.status(404).send({message:`Alquileres para el usuario ${usuario} no existen`})

			res.status(200).send({alquiler:alquiler}) 
		})
	}	
	else if(req.query.nombre){
		console.log('getAlquileresByNombre')
		let nombre = req.query.nombre
		Alquiler.findOneByIdPublico(idPublico, function (err,alquiler) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!alquiler) return res.status(404).send({message:`El idPublico ${idPublico} no existe`})

			res.status(200).send({alquiler:alquiler}) 
		})
	}
	else{
		console.log('getAllAlquileres')
		Alquiler.find({}, (err,Alquileres) => {		
			if (err)  return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if (!Alquileres) return res.status(404).send({message: 'No existen Alquileres'})
			res.status(200).send({Alquileres})
		}).populate({path:'usuarioresp',select: 'displayName + habilitado '})	
	}	
}

function getAlquiler(req,res){		
		console.log('getAlquilerByID')		
		let alquilerId = req.params.alquilerId
		Alquiler.findById(alquilerId, (err,alquiler) => {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!alquiler) return res.status(404).send({message:`El alquiler ${alquilerId} no existe`})

			res.status(200).send({alquiler:alquiler}) 
		})
}

function postAlquiler(req,res){		
	const alquiler = new Alquiler({
		nombre: req.body.nombre,
		fechaValidez: req.body.fechaValidez,
		usuarioResp: req.body.usuarioResp		
	})

	alquiler.save( (err,alquilerStored) => {		
		if(err) return res.status(500).send({message:`Error al guardar en la base de datos: ${err}`})

		res.status(200).send({alquiler: alquilerStored})
	})
}

function putAlquiler(req,res){
	let alquilerId = req.params.alquilerId  
	let updateObject = req.body
	
	Alquiler.findByIdAndUpdate(alquilerId, updateObject, (err,alquilerUpdated) => {
		if(err) return res.status(500).send({message: `Error al actualizar el Alquiler: ${err}`})

		console.log('Se actualizó correctamente el Alquiler')
		res.status(200).send({alquiler:alquilerUpdated})
	})
}

function deleteAlquiler(req,res){
	let alquilerId = req.params.alquilerId	
	
	Alquiler.findByIdAndDelete(alquilerId, (err,alquiler) => {
		if(err) return res.status(500).send({message: `Error al borrar el Alquiler: ${err}`})

		if(!alquiler) return res.status(401).send({message: 'El objeto no existia'})

		console.log('Se eliminó el Alquiler.')
		res.status(200).send({message: 'El Alquiler ha sido eliminado'})		
	})
}

module.exports = {
	getAlquileres,
	getAlquiler,
	postAlquiler,
	putAlquiler,
	deleteAlquiler
}