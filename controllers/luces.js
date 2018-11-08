'use strict'

const luces = require('../models/luz.js')




function activarLuces(req,res){	
	luces.EncenderTodasLasLuces( (callback) => { 
		if(callback)
			return res.status(200).send({message:`${callback}`})

		return res.status(200).send({message:`Respuesta de Activando Luces vacia`})
	})	
} 

function desactivarLuces(req,res){	
	luces.ApagarTodasLasLuces( (callback) => { 
		if(callback)
			return res.status(200).send({message:`${callback}`})

		return res.status(200).send({message:`Respuesta de Desactivando Luces vacia`})
	})	
} 

function activarLucesPrimarias(req,res){	
	luces.EncenderPrimarias( (callback) => { 
		if(callback)
			return res.status(200).send({message:`${callback}`})

		return res.status(200).send({message:`Respuesta de Activando Luces vacia`})
	})	
} 

function desactivarLucesPrimarias(req,res){	
	luces.ApagarPrimarias( (callback) => { 
		if(callback)
			return res.status(200).send({message:`${callback}`})

		return res.status(200).send({message:`Respuesta de Desactivando Luces vacia`})
	})	
} 

function activarLucesSecundarias(req,res){	
	luces.EncenderSecundarias( (callback) => { 
		if(callback)
			return res.status(200).send({message:`${callback}`})

		return res.status(200).send({message:`Respuesta de Activando Luces vacia`})
	})	
} 

function desactivarLucesSecundarias(req,res){	
	luces.ApagarSecundarias( (callback) => { 
		if(callback)
			return res.status(200).send({message:`${callback}`})

		return res.status(200).send({message:`Respuesta de Desactivando Luces vacia`})
	})	
} 

function estadoLucesPrimarias(req,res){	
	luces.GetEstadoPrimarias( (callback) => { 
		//if(callback)
			return res.status(200).send({estado:`${callback}`})

		//return res.status(200).send({message:`Respuesta de estado Luces vacia`})
	})	
} 

function estadoLucesSecundarias(req,res){	
	luces.GetEstadoSecundarias( (callback) => { 
		//if(callback)
			return res.status(200).send({estado:`${callback}`})

		//return res.status(200).send({message:`Respuesta de estado Luces vacia`})
	})	
} 


module.exports = {
	activarLuces,
	desactivarLuces,
	activarLucesPrimarias,
	desactivarLucesPrimarias,
	activarLucesSecundarias,
	desactivarLucesSecundarias,
	estadoLucesPrimarias,
	estadoLucesSecundarias
}