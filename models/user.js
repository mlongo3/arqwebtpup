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
	role: {type: String, enum: ['admin','manager','basic'],default: 'basic'}, //Admin del sistema, Manager de alquiler, basico de acceso.
	alquiler: { 
		alquilerId: String, 
		alquilerNombre: String
	},
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

module.exports = mongoose.model('User',UserSchema)


	

