'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creamos el modelo.
const AccesoSchema = Schema({
	idPublico: { type: String, index: { unique: true }, required: true },		
	fechaAlta: {type: Date, default: Date.now()},
	fechaValidez: {type: Date, default: Date.now() + 30},	
	habilitado: {type:Boolean, default: true},
	usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Acceso',AccesoSchema)