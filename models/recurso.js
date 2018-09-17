'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema

//Creamos el modelo.
const RecursoSchema = Schema({
	nombre: { type: String, index: { unique: true }, required: true , uppercase:true},
	tipo: {type: String, enum: ['porton','luz','semaforo','parada','switch','movimiento','fotocelula'] , required: true, lowercase:true},
	//GPIO['05','06',,'12','13','16','19','20','21','25','26']
	puerto1: {type: Number , required: true, index: { unique: true }},
	puerto2: {type: Number,default:0},
	puertomodo: {type: String, enum: ['in','out','both'] , required: true, lowercase:true},
	tiempo: { type:Number, default: 0}, 
	habilitado: {type:Boolean, default: true}	
})

RecursoSchema.statics.findByTipo = function (tipo, callback) {    
  	let limit = 20;
    let order = 1;

    this.find({ tipo:tipo }, callback).limit(limit).sort({nombre:order,puertomodo:order,puerto1:order});    
};

RecursoSchema.statics.findByPuertoModo = function (puertomodo, callback) {    
  	let limit = 20;
    let order = 1;

    this.find({ puertomodo:puertomodo }, callback).limit(limit).sort({tipo:order,nombre:order,puerto1:order});    
};

RecursoSchema.statics.findOneByNombre = function (nombre, callback) {    
    this.findOne({ nombre:nombre }, callback);
};



module.exports = mongoose.model('Resource',RecursoSchema)