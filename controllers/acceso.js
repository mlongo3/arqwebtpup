'use strict'

const Acceso = require('../models/acceso.js')

function getAccesos(req,res){	
	if(req.query.usuario){
		console.log('getAccesosByUsuario')
		let usuario = req.query.usuario	
		Acceso.findByUsuario(usuario, function (err,acceso) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!acceso) return res.status(404).send({message:`No existen accesos para el usuario ${usuario}`})

			res.status(200).send({acceso:acceso}) 
		})
	}	
	else if(req.query.idPublico){
		console.log('getAccesosByIdPublico')
		let idPublico = req.query.idPublico
		Acceso.findOneByIdPublico(idPublico, function (err,Acceso) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!Acceso) return res.status(404).send({message:`El idPublico ${idPublico} no existe`})

			res.status(200).send({acceso:acceso}) 
		})
	}
	else{
		console.log('getAllAccesos')
		Acceso.find({}, (err,Accesos) => {		
			if (err)  return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if (!Accesos) return res.status(404).send({message: 'No existen Accesos'})
			res.status(200).send({Accesos})
		}).populate({path:'usuario',select: 'displayName + habilitado '})
		.populate({path:'usuario.alquiler'})		
	}	
}

function getAcceso(req,res){		
		console.log('getAccesoByID')		
		let accesoId = req.params.accesoId
		Acceso.findById(accesoId, (err,acceso) => {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

			if(!acceso) return res.status(404).send({message:`El acceso ${accesoId} no existe`})

			res.status(200).send({acceso:acceso}) 
		})
}

function postAcceso(req,res){		
	const acceso = new Acceso({
		idPublico: req.body.idPublico,
		fechaValidez: req.body.fechaValidez,
		usuario: req.body.usuario		
	})

	acceso.save( (err,Accesostored) => {		
		if(err){
			if (err.name === 'MongoError' && err.code === 11000) {
	        	// Duplicate
	        	return res.status(409).send({message: 'Ya existe uno igual!'});
	      	}
			return res.status(500).send({message:`Error al guardar en la base de datos: ${err}`})
		}

		res.status(200).send({acceso: Accesostored})
	})
}

function putAcceso(req,res){
	let accesoId = req.params.accesoId  
	let updateObject = req.body
	
	Acceso.findByIdAndUpdate(accesoId, updateObject, (err,AccesoUpdated) => {
		if(err) return res.status(500).send({message: `Error al actualizar el Acceso: ${err}`})
		if(!AccesoUpdated) return res.status(404).send({message: `El acceso no existe`})
		console.log('Se actualizó correctamente el Acceso')
		res.status(202).send({acceso:AccesoUpdated})
	})
}

function deleteAcceso(req,res){
	let accesoId = req.params.accesoId	
	
	Acceso.findByIdAndDelete(accesoId, (err,acceso) => {
		if(err) return res.status(500).send({message: `Error al borrar el Acceso: ${err}`})

		if(!acceso) return res.status(404).send({message: 'El acceso no existia'})

		console.log('Se eliminó el Acceso.')
		res.status(200).send({message: 'El Acceso ha sido eliminado'})		
	})
}

module.exports = {
	getAccesos,
	getAcceso,
	postAcceso,
	putAcceso,
	deleteAcceso
}