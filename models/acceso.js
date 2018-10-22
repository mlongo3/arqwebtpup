'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

function masDias (){
	return Date.now() + 30*24*60*60*1000
}

//Creamos el modelo.
const AccesoSchema = Schema({
	idPublico: { type: String, index: { unique: true }, required: true },		
	fechaAlta: {type: Date, default: Date.now, required: true},
	fechaValidez: {type: Date, default: masDias , required: true},	
	habilitado: {type:Boolean, default: true},
	usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

AccesoSchema.statics.findByUsuario = function (usuario, callback) {   

    this.find({ usuario:usuario }, callback);    
};

AccesoSchema.statics.findOneByIdPublico = function (idPublico, callback) {    
    this.findOne({ idPublico:idPublico }, callback);
};




module.exports = mongoose.model('Acceso',AccesoSchema)