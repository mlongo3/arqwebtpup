'use strict'

const porton = require('../models/porton.js')

function activarPorton(req,res){
	
	var intervaloParpadeo = setInterval( function (){
		var estado = verEstado();
		if(estado == 'detenido'){
			clearInterval(intervaloParpadeo);
		}
		console.log( estado )
	}, 1000)

	porton.AccionarPorton( (callback) => {
		
	if(callback)
		return res.status(200).send({message:`${callback}`})

	return res.status(200).send({message:`Respuesta de Activando Porton vacia`})
	});
} 

function getEstado(req,res){
	var estado = verEstado();
	return res.status(200).send({message:`${estado}`})
}

function detenerPorton(req,res){
	porton.stop( () => {
		
	return res.status(200).send({message:'Se detuvo el porton'})
	});
}

function verEstado(){
	return porton.GetEstado()
}

module.exports = {
	activarPorton,
	getEstado,
	detenerPorton
}