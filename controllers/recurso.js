'use strict'

const Resource = require('../models/recurso.js')

function getRecursos(req,res){	
	if(req.query.tipo){
		console.log('getRecursosByTipo')
		let tipo = req.query.tipo	
		Resource.findByTipo(tipo, function (err,recurso) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!recurso) return res.status(404).send({message:`El tipo ${tipo} no existe`})

			res.status(200).send({recurso:recurso}) 
		})
	}
	else if(req.query.puertomodo){
		console.log('getRecursosByPuertoModo')
		let puertomodo = req.query.puertomodo	
		Resource.findByPuertoModo(puertomodo, function (err,recurso) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!recurso) return res.status(404).send({message:`El puertomodo ${puertomodo} no existe`})

			res.status(200).send({recurso:recurso}) 
		})
	}
	else if(req.query.nombre){
		console.log('getRecursosByNombre')
		let nombre = req.query.nombre
		Resource.findOneByNombre(nombre, function (err,recurso) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!recurso) return res.status(404).send({message:`El nombre ${nombre} no existe`})

			res.status(200).send({recurso:recurso}) 
		})
	}
	else{
		console.log('getAllRecursos')
		Resource.find({}, (err,recursos) => {		
			if (err)  return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if (!recursos) return res.status(404).send({message: 'No existen recursos'})
			res.status(200).send({recursos})
		})
	}	
}

function getRecurso(req,res){		
		console.log('getResourceByID')		
		let recursoId = req.params.recursoId
		Resource.findById(recursoId, (err,recurso) => {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!recurso) return res.status(404).send({message:`El recurso ${recursoId} no existe`})

			res.status(200).send({recurso:recurso}) 
		})
}

function postRecurso(req,res){		
	const recurso = new Resource({
		nombre: req.body.nombre.toUpperCase(),
		tipo: req.body.tipo.toLowerCase(),
		puerto1: req.body.puerto1,
		puerto2: req.body.puerto2,
		puertomodo: req.body.puertomodo.toLowerCase(),
		tiempo: req.body.tiempo,
		habilitado: true
	})

	recurso.save( (err,recursoStored) => {		
		if(err) return res.status(500).send({message:`Error al guardar en la base de datos: ${err}`})

		res.status(200).send({recurso: recursoStored})
	})
}

function putRecurso(req,res){
	let recursoId = req.params.recursoId  
	let updateObject = req.body
	Resource.findByIdAndUpdate(recursoId, updateObject, (err,resourceUpdated) => {
		if(err) return res.status(500).send({message: `Error al actualizar el recurso: ${err}`})

		console.log('Se actualizó correctamente el recurso')
		res.status(200).send({recurso:resourceUpdated})
	})
}

function deleteRecurso(req,res){
	let recursoId = req.params.recursoId	

	Resource.findByIdAndDelete(recursoId, (err,recurso) => {
		if(err) return res.status(500).send({message: `Error al borrar el recurso: ${err}`})

		if(!recurso) return res.status(401).send({message: 'El objeto no existia'})

		console.log('Se eliminó el recurso.')
		res.status(200).send({message: 'El recurso ha sido eliminado'})		
	})
}

module.exports = {
	getRecursos,
	getRecurso,
	postRecurso,
	putRecurso,
	deleteRecurso
}