'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creamos el modelo.
const AlquilerSchema = Schema({
	nombre: String,
	email: String,
	dcalle: String,
	dnumero: { type:Number, default: 0},
	dpiso: String,
	ddepartamento: String,
	dcodigopostal: String,
	dlocalidad: String,
	telefono: { type:Number, default: 0},
	celular: { type:Number, default: 0},	
	fechaAlta: {type: Date, default: Date.now()},
	fechaValidez: {type: Date, default: Date.now() + 30},
	usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	alquiler: { type: mongoose.Schema.Types.ObjectId, ref: 'Alquiler'}
})

module.exports = mongoose.model('Alquiler',AlquilerSchema)