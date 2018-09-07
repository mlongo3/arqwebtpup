'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creamos el modelo.
const UserSchema = Schema({		
	email: {type: String, required: true, index: { unique: true }, lowercase:true }, //estandarizamos para que guarde todo en lowecase	
	nombre: { type: String, required: true },
	apellido: { type: String, required: true },
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
	manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	role: {type: String, enum: ['admin','manager','basic'],default: 'basic'} //Admin del sistema, Manager de alquiler, basico de acceso.
	alquiler: {
		alquiler_id: String,
		alquiler_Nombre: String
	}
	habilitado: {type:Boolean, default: true},
	lastLogin: Date
})

module.exports = mongoose.model('User',UserSchema)


	

