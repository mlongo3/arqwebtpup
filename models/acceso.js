'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creamos el modelo.
const AccesoSchema = Schema({
	idPublico: String,		
	fechaAlta: {type: Date, default: Date.now()},
	fechaValidez: {type: Date, default: Date.now() + 30},	
	persona: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona'}
})

module.exports = mongoose.model('Acceso',AccesoSchema)