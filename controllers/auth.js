'use strict'

const User = require('../models/user.js')
const service = require('../services/index.js')


function signUp(req,res){
	console.log('Registrando usuario: ', req.body)
	const user = new User({
		email: req.body.email,
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		displayName: 
			req.body.apellido.charAt(0).toUpperCase() + req.body.apellido.slice(1) 
			+ " " 
			+ req.body.nombre.charAt(0).toUpperCase() + req.body.nombre.slice(1),
		password: req.body.password
	})		
	
	
	user.save(function(err){
		if(err) 
			return res.status(500).send({msg:`Error al crear el usuario: ${err}`})

		//else
		return res.status(201).send({msg: 'usuario creado correctamente',token: service.createToken(user)}) //vamos a usar un servicio para crear un token para el usuario.
	})
}

function signIn(req,res){	
	console.log('------------')
	console.log('Inicianso sesion usuario: ', req.body.email)
	console.log('------------')
	console.log('')
	User.findOne({ email: req.body.email }, (err, user) => {		
	
    if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
    	
    if (!user) return res.status(404).send({ msg: `No existe el usuario: ${req.body.email}` })

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(406).send({ msg: `Error de contraseña: ${req.body.email}` })      
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
    });
   	})	
}

module.exports = {
	signUp,
	signIn
}
