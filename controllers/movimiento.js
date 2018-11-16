'use strict'

const movimiento = require( "../models/movimiento.js" );

function getEstado(req,res){
	var estado = movimiento.GetEstado()
	return res.status(200).send({message:`${estado}`})
}

function Desactivar(req,res){
	movimiento.Desactivar()
	return res.status(202).send({message:'desactivado'})
}

function Activar(req,res){
	movimiento.Activar()
	return res.status(202).send({message:'activado'})
}

module.exports = {
	getEstado,
	Desactivar,
	Activar
}