'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema

//Creamos el modelo.
const RegistroSchema = Schema({
	userId: { type: String, required: true}, 
	email: {type: String, lowercase:true },
	displayName: String,
	manager: { type: String, required: true}, 
	alquiler: { type: String, required: true}, 
	time: {type: Date, default: Date.now(), required: true},
	recursoNombre: {type: String, lowercase:true },
	accion: {type: String, lowercase:true },
	resultado: {type: String, lowercase:true },
	tipo: {type: String, enum: ['info','advertencia','error','critico'] , required: true, lowercase:true},
	descripcion: String,
	eventID: { type:Number, default: 0}
})

RegistroSchema.statics.findByTipo = function (req, callback) {    
  	let limit = 20;
  	let skip = 0;
    let order = -1;

    if(req.skip){    	    	    	
    	skip = parseInt(req.skip);    	
    	if(skip < 0) skip=0;
    }
    if(req.limit){
    	limit = parseInt(req.limit);    	
    }
    if(req.order){
    	if(req.order == 'ASC'){
    		order = 1;
    	}
    }   

    this.find({ tipo:req.tipo }, callback).skip(skip).limit(limit).sort({time:order});    
};

RegistroSchema.statics.findByEventId = function (req, callback) {    
  	let limit = 20;
  	let skip = 0;
    let order = -1;

    if(req.skip){    	    	    	
    	skip = parseInt(req.skip);    	
    	if(skip < 0) skip=0;
    }
    if(req.limit){
    	limit = parseInt(req.limit);    	
    }
    if(req.order){
    	if(req.order == 'ASC'){
    		order = 1;
    	}
    }   

    this.find({ eventID:req.eventID }, callback).skip(skip).limit(limit).sort({time:order});    
};

RegistroSchema.statics.findByRecursoNombre = function (req, callback) {    
  	let limit = 20;
  	let skip = 0;
    let order = -1;

    if(req.skip){    	    	    	
    	skip = parseInt(req.skip);    	
    	if(skip < 0) skip=0;
    }
    if(req.limit){
    	limit = parseInt(req.limit);    	
    }
    if(req.order){
    	if(req.order == 'ASC'){
    		order = 1;
    	}
    }   

    this.find({ recursoNombre:req.recursoNombre }, callback).skip(skip).limit(limit).sort({time:order});    
};

RegistroSchema.statics.findByAlquiler = function (req, callback) {    
  	let limit = 20;
  	let skip = 0;
    let order = -1;

    if(req.skip){    	    	    	
    	skip = parseInt(req.skip);    	
    	if(skip < 0) skip=0;
    }
    if(req.limit){
    	limit = parseInt(req.limit);    	
    }
    if(req.order){
    	if(req.order == 'ASC'){
    		order = 1;
    	}
    }   

    this.find({ alquiler:req.alquiler }, callback).skip(skip).limit(limit).sort({time:order});    
};

RegistroSchema.statics.findByUserId = function (req, callback) {    
  	let limit = 20;
  	let skip = 0;
    let order = -1;

    if(req.skip){    	    	    	
    	skip = parseInt(req.skip);    	
    	if(skip < 0) skip=0;
    }
    if(req.limit){
    	limit = parseInt(req.limit);    	
    }
    if(req.order){
    	if(req.order == 'ASC'){
    		order = 1;
    	}
    }   

    this.find({ userId:req.userId }, callback).skip(skip).limit(limit).sort({time:order});    
};


module.exports = mongoose.model('Resource',RecursoSchema)