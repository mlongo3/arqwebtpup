'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

//Creamos el modelo.
const AlquilerSchema = Schema({
	nombre: {type: String, required: true, index: { unique: true }, lowercase:true },	
	fechaAlta: {type: Date, default: Date.now()},
	fechaValidez: {type: Date, default: moment().add(30,'days').unix() ,required: true},
	usuarioResp: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true} //Usuario responsable	
})

module.exports = mongoose.model('Alquiler',AlquilerSchema)