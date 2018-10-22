'use strict'

const porton = require('../models/porton.js')
const luces = require('../models/luz.js')
const camara = require('./camara.js')


function activarPorton(req,res){
	//Verificar estado para ver si enciendo o no las luces y el tema del tiempo.	
	//luces.EncenderTodasLasLuces( (callback) => { console.log(`${callback}`)})
	camara.capturar('activacion')
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
	porton.stop();
	camara.capturar('emergencia')
	return res.status(200).send({message:'Se detuvo el porton'})
}

function verEstado(){
	return porton.GetEstado()
}

module.exports = {
	activarPorton,
	getEstado,
	detenerPorton,
	verEstado
}