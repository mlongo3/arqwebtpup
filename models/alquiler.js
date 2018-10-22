'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

function masDias (){
	return Date.now() + 30*24*60*60*1000
}

//Creamos el modelo.
const AlquilerSchema = Schema({
	nombre: {type: String, required: true, index: { unique: true }, uppercase:true },	
	fechaAlta: {type: Date, default: Date.now},
	fechaValidez: {type: Date, default: masDias ,required: true},
	managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true} //Usuario responsable	
})

module.exports = mongoose.model('Alquiler',AlquilerSchema)