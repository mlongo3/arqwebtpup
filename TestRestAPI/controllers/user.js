'use strict'

const User = require('../models/user.js')
const service = require('../services/index.js')

function signUp(req,res){
	//console.log(req.body.email + req.body.displayName + req.body.password)
	console.log('Registrando usuario: ', req.body)
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
		//La contraseña no hace falta agregarla acá porque ya está en el modelo Schema.pre
		//Tampoco fecha de registro, porque es automatico
		//lastlogin tampoco, porque se está creando.
	})		
	
	user.avatar = user.gravatar();

	user.save(function(err) {
		if(err) return res.status(500).send({message:`Error al crear el usuario: ${err}`})

		//else
		return res.status(201).send({token: service.createToken(user)}) //vamos a usar un servicio para crear un token para el usuario.
	})
}

function signIn(req,res){	
	console.log('------------')
	console.log('Inicianso sesion usuario: ', req.body.email)
	console.log('------------')
	console.log('')
	User.find({ email: req.body.email }, (err, user) => {
	
    if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
    	
    if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })

    req.user = user
return res.status(200).send({ msg: `Te has logueado correctamente ${user.email}`, token: service.createToken(user) })
    /*==== ESTO FUNCIONA      
      res.status(200).send({ 
      	msg: 'Te has logueado correctamente', 
      	token: service.createToken(user) 
    	})
	=====*/
    
    /*=============================================
    =            Section comment block            =
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

      console.log('por aca vamos')
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
    });
    //=============================================*/
   	})	
}

module.exports = {
	signUp,
	signIn
}
