'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creamos el modelo.
const RecursoSchema = Schema({
	idPublico: { type: String, index: { unique: true }, required: true },
	tipo: {type: String, enum: ['porton','luz','semaforo','parada','switch','movimiento','fotocelula'] , required: true}
	//GPIO['05','06',,'12','13','16','19','20','21','25','26']
	puerto1: {type: Number , required: true, index: { unique: true }}
	puerto2: {type: Number}
	puertomodo: {type: String, enum: ['entrada','salida'] , required: true}
	tiempo: { type:Number, default: 0}, 
	habilitado: {type:Boolean, default: true},
	//usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Recurso',RecursoSchema)