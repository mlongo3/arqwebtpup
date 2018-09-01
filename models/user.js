'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creamos el modelo.
const UserSchema = Schema({		
	email: {type: String, required: true, index: { unique: true }, lowercase:true }, //estandarizamos para que guarde todo en lowecase	
	displayName: String,
	password: { type: String, required: true },
	signupDate: {type: Date, default: Date.now()},
	role: {type: String, enum: ['admin','basic'],default: 'basic'}
	lastLogin: Date
})

module.exports = mongoose.model('User',UserSchema)