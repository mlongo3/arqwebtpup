'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs') //Para hashear la contraseña
const crypto = require('crypto')
const SALT_WORK_FACTOR = 10;


//Creamos el modelo.
const UserSchema = Schema({		
	email: {type: String, required: true, index: { unique: true }, lowercase:true }, //estandarizamos para que guarde todo en lowecase	
	nombre: { type: String, required: true , lowercase:true},
	apellido: { type: String, required: true , uppercase:true},
	displayName: String,
	password: { type: String, required: true },
	dcalle: { type: String, lowercase:true},
	dnumero: { type:Number, default: 0},
	dpiso: String,
	ddepartamento: String,
	dcodigopostal: String,
	dlocalidad: { type: String, uppercase:true},
	telefono: { type:Number, default: 0},
	celular: { type:Number, default: 0},	
	signupDate: {type: Date, default: Date.now, required: true},
	manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	role: {type: String, enum: ['admin','manager','basic'],default: 'basic'}, //Admin del sistema, Manager de alquiler, basico de acceso.
	alquiler: { type: mongoose.Schema.Types.ObjectId, ref: 'Alquiler'}, //el alquiler con el que quedará registro por asociación cualquier acto.
	habilitado: {type:Boolean, default: true},
	avatar: String, //voy a guardar la URL no una imagen.
	lastLogin: Date
})

UserSchema.pre('save', function (next) { //ACA SI DEFINIS UN ARROW FUNCTION FALLA 
	var user = this;
	//Si el usuario no modificó la contraseña, que siga. 
	if (!user.isModified('password')) return next();
	
	//sino genero el salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt) {
		
		if(err) return next() //AGREGUE ERR
		
		//sino hashee la password
		bcrypt.hash(user.password,salt,null, function(err,hash) {
			
			if (err) return next(err)				
			//sino hay error
			user.password = hash //cambiamos la password con el hash que creamos y pasamos a la siguiente funcionalidad.
			next()
		})
	})
})


UserSchema.methods.gravatar = function(){
	//si el usuario no tiene el mail registrado en GRAVATAR
	if(!this.email) return `https://gravatar.com/avatar/?s=200&d=mp` //ponga un gravatar por default
		//otras opciones de imagen en lugar de MP, identicon, mosterid, wavatar retro robohash blak

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?s=200&d=mp`
}

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}


UserSchema.statics.findOneByEmail = function (email, callback) {    
    this.findOne({ email:email }, callback);
};

UserSchema.statics.findOneByRole = function (req, callback) {    
    let skip = 0;
    let limit = 20;
    let order = 1;

    if(req.skip){    	    	    	
    	skip = parseInt(req.skip);    	
    	if(skip < 0) skip=0;
    }
    if(req.limit){
    	limit = parseInt(req.limit);    	
    }
    if(req.order){
    	if(req.order == 'DSC'){
    		order = -1;
    	}
    }       
    this.find({ role:req.role }, callback).skip(skip).limit(limit).sort({apellido:order});    
};

UserSchema.statics.findOneByApellido = function (req, callback) {    
	let skip = 0;
    let limit = 20;
    let order = 1;

    if(req.skip){    	    	    	
    	skip = parseInt(req.skip);    	
    	if(skip < 0) skip=0;
    }
    if(req.limit){
    	limit = parseInt(req.limit);    	
    }
    if(req.order){
    	if(req.order == 'DSC'){
    		order = -1;
    	}
    }   
    this.find({ apellido:req.apellido }, callback).skip(skip).limit(limit).sort({apellido:order,nombre:order});    
};

UserSchema.statics.findDependientesManager = function (usr,req, callback) {    
	let skip = 0;
    let limit = 20;
    let order = 1;
    console.log('Consultando usuarios dependientes de:')
    console.log(usr)
    //console.log(req)

    if(req.skip){    	    	    	
    	skip = parseInt(req.skip);    	
    	if(skip < 0) skip=0;
    }
    if(req.limit){
    	limit = parseInt(req.limit);    	
    }
    if(req.order){
    	if(req.order == 'DSC'){
    		order = -1;
    	}
    }   
    this.find({ manager:usr }, callback).skip(skip).limit(limit).sort({apellido:order,nombre:order});    
};

UserSchema.statics.getRol = function (userid,callback){
	console.log('Obteniendo Rol')
	//console.log(userid)		
	//console.log(callback)		
	this.findById(userid, (err,user) => {
		if(err) {
			//console.log('muchos errores')
			return callback('error')
		}

		if(!user){
			//console.log('no encontro el usuario')
			return callback('noExiste')
		} 
		//console.log('encontro el usuario')
		//console.log(user)
		return callback(user.role)
	})
}

UserSchema.statics.getManager = function (userid,callback){
	console.log('Obteniendo Manager')	
	this.findById(userid, (err,user) => {
		if(err) {			
			return callback('error')
		}
		if(!user){		
			return callback('noExiste')
		} 		
		return callback(user.manager)
	})
}

UserSchema.statics.getUsuario = function (userid,callback){
	//console.log('Obteniendo Usuario')	
	this.findById(userid, (err,user) => {
		if(err) {			
			return callback('error')
		}
		if(!user){		
			return callback('noExiste')
		} 		
		return callback(user)
	}).populate('alquiler')
}

module.exports = mongoose.model('User',UserSchema)


	

