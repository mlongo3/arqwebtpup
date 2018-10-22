'use strict'

const User = require('../models/user.js')
const bcrypt = require('bcrypt-nodejs') //Para hashear la contraseña
const crypto = require('crypto')
const SALT_WORK_FACTOR = 10;
const passLength = 8

function getUsuarios(req,res){	
	if(req.query.email){
		console.log('getUserByEmail')
		let email = req.query.email	
		User.findOneByEmail(email, function (err,user) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if(!user) return res.status(404).send({message:`El email ${email} no existe`})
			res.status(200).send({user:user}) 
		})
	}
	else if(req.query.apellido){
		console.log('getUserByApellido')
		let apellido = req.query.apellido	
		User.findOneByApellido(req.query, function (err,user) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if(!user) return res.status(404).send({message:`El apellido ${apellido} no existe`})
			res.status(200).send({user:user}) 
		})
	}
	else if(req.query.role){
		console.log('getUserByRole')
		let role = req.query.role
		User.findOneByRole(req.query, function (err,user) {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if(!user) return res.status(404).send({message:`El role ${role} no existe`})
			res.status(200).send({user:user}) 
		})
	}
	else{
		console.log('getAllUsers')
		User.find({}, (err,usuarios) => {		
			if (err)  return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if (!usuarios) return res.status(404).send({message: 'No existen usuarios'})
			res.status(200).send({usuarios})
		}).populate('manager','displayName')
	}	
}


function getUsuario(req,res){		
		console.log('getUserByID')		
		let userId = req.params.userId
		User.findById(userId, (err,user) => {
			if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
			if(!user) return res.status(404).send({message:`El usuario ${userId} no existe`})
			res.status(200).send({user:user}) 
		})
}

function postUsuario(req,res){		
	const user = new User({
		email: req.body.email,
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		displayName: 
			req.body.apellido.charAt(0).toUpperCase() + req.body.apellido.slice(1).toLowerCase() 
			+ " " 
			+ req.body.nombre.charAt(0).toUpperCase() + req.body.nombre.slice(1).toLowerCase(),
		password: req.body.password,
		dcalle: req.body.dcalle,
		dnumero: req.body.dnumero,
		dpiso: req.body.dpiso,
		ddepartamento: req.body.ddepartamento,
		dcodigopostal: req.body.dcodigopostal,
		dlocalidad: req.body.dlocalidad,
		telefono: req.body.telefono,
		celular: req.body.celular,
		manager: req.user,
		role: "basic"		
	})	
	
	//todos los campos que quiera.
	user.save( (err,userStored) => {		
		if(err) return res.status(500).send({message:`Error al guardar en la base de datos: ${err}`})
		res.status(201).send({product: userStored})
	}) 
}

function putUsuario(req,res){
	let userId = req.params.userId  	
	//Remuevo los campos que me quiero asegurar que no sean actualizados.
	if(req.body.email){delete req.body.email}
	if(req.body.displayName){delete req.body.displayName}	
	if(req.body.email){delete req.body.email}
	if(req.body.password){
		//aca agregar que haga el hash y luego la sobre escriba
		delete req.body.password
	}

	let updateObject = req.body	
	console.log(updateObject)
	
	//Asegurarse de que no esté incluido el email.
	//Verificar que no incluye la Displayname,manager, password y el rol, salvo casos a analizar.
	User.findByIdAndUpdate(userId, updateObject, (err,userUpdated) => {
		if(err) return res.status(500).send({message: `Error al actualizar el usuario: ${err}`})
		console.log('Se actualizó correctamente el usuario')
		res.status(202).send({user: userUpdated})
	})
}

function deleteUsuario(req,res){
	let userId = req.params.userId	

	User.findByIdAndDelete(userId, (err,user) => {
		if(err) return res.status(500).send({message: `Error al borrar el usuario: ${err}`})
		if(!user) return res.status(401).send({message: 'El objeto no existia'})
			
		console.log('Se eliminó el usuario.')
		res.status(200).send({message: 'El usuario ha sido eliminado'})		
	})
}

function setPassword(req,res){
	let userId = req.params.userId
	let newPassword = req.body.password
	//console.log(req)
	if(newPassword.length < passLength){
		return res.status(406).send({message: `La password debe contener al menos ${passLength} caracteres.`})
	}
	else{
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt) {
			if(err){
				return res.status(500).send({message:'Error con el salt de la password'})
			} 
			else{
				bcrypt.hash(newPassword,salt,null, function(err,hash) {					
					if (err){
						return res.status(500).send({message:'Error con el hash de la password'})
					}
					else{
						//sino hay error						
						let password = hash
						
						//actualizo la password.
						User.findByIdAndUpdate(userId, {password:password} , (err,userUpdated) => {
							if(err){
								return res.status(500).send({message: `Error al actualizar la passwrod del usuario: ${err}`})
							}
							else{
								console.log('Se actualizó correctamente la password del usuario')
								return res.status(202).send({message:'Se cambió la password existosamente'})
							}							
						})						
					}
				})				
			}
		})
	}	
}

module.exports = {
	getUsuarios,
	getUsuario,
	postUsuario,
	putUsuario,	
	deleteUsuario,
	setPassword,
	//getUsuarioRol
}
