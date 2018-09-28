'use strict'

const Resource = require('../models/recurso.js')
const Gpio = require('onoff').Gpio,

function putRecurso(req,res){
	let recursoId = req.params.recursoId  
	
	Resource.findById(recursoId, (err,recurso) =>{
		if(err) return res.status(500).send({message: `Error al buscar el recurso: ${err}`})

		if(!recurso) return res.status(404).send({message:`El recurso ${recursoId} no existe`})

		console.log('Procesando...')		

		if(!recurso.habilitado) 
			return res.status(403).send({message:'No está habilitado el recurso'})

		//si está habilitado, verifico tener los dos puertos.

		if(!recurso.puerto1 || !recurso.puerto2 || !recurso.puertomodo)
			return res.status(500).send({message:'Configuración no disponible'})

		//Si esta todo ok, ejecuto....
		let miRec = new Gpio(recurso.puerto1, recurso.puertomodo);

		var iv = setInterval(function(){
			miRec.writeSync(miRec.readSync() === 0 ? 1 : 0)
		}, recurso.tiempo);


	})


	let updateObject = req.body
	Resource.findById(recursoId, updateObject, (err,resourceUpdated) => {
		if(err) return res.status(500).send({message: `Error al actualizar el recurso: ${err}`})

		console.log('Se actualizó correctamente el recurso')
		res.status(200).send({recurso:resourceUpdated})
	})
}