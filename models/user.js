'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creamos el modelo.
const UserSchema = Schema({		
	email: {type: String, required: true, index: { unique: true }, lowercase:true }, //estandarizamos para que guarde todo en lowecase	
	nombre: String,
	apellido: String,
	displayName: String,
	password: { type: String, required: true },
	dcalle: String,
	dnumero: { type:Number, default: 0},
	dpiso: String,
	ddepartamento: String,
	dcodigopostal: String,
	dlocalidad: String,
	telefono: { type:Number, default: 0},
	celular: { type:Number, default: 0},	
	signupDate: {type: Date, default: Date.now()},
	role: {type: String, enum: ['admin','manager','basic'],default: 'basic'} //Admin del sistema, Manager de alquiler, basico de acceso.
	alquiler: { type: mongoose.Schema.Types.ObjectId, ref: 'Alquiler'}
	lastLogin: Date
})

module.exports = mongoose.model('User',UserSchema)


	

