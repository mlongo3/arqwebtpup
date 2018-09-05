'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs') //Para hashear la contraseña
const crypto = require('crypto')
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
	email: {type: String, required: true, index: { unique: true }, lowercase:true }, //estandarizamos para que guarde todo en lowecase
	displayName: String,
	avatar: String, //voy a guardar la URL no una imagen.
	password: { type: String, select:true, required: true },
	//password: {type: String, select:true}, //El select false, es para evitar que cada vez que pido el usuario, este campo no lo traiga.
	signupDate: {type: Date, default: Date.now()},
	lastLogin: Date
})


//funciones que se ejecutan antes o despues. Para este caso antes. para encriptar la contraseña

//next para que pase a lo siguiente en el midlware y no se quede trabado en la funcion.
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

//Vamos a utilizar otra funcion, para usar un avatar 

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


module.exports = mongoose.model('User', UserSchema)