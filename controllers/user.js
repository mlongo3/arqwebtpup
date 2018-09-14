'use strict'

const User = require('../models/user.js')


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
		})
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
		if(err) res.status(500).send({message:`Error al guardar en la base de datos: ${err}`})


		res.status(200).send({product: userStored})
	}) 
}

function putUsuario(req,res){
	let userId = req.params.userId  
	let update = req.body
	User.findByIdAndUpdate(userId, update, (err,userUpdated) => {
		if(err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})

		console.log('Se actualizó correctamente el usuario')
		res.status(200).send({user: userUpdated})
	})
}

function patchUsuario(req,res){
	let updateObject = req.body;
    let userId = req.params.userId
    User.findByIdAndUpdate(userId, updateObject, (err,userUpdated) => {
		if(err) res.status(500).send({message: `Error al patchear el usuario: ${err}`})

		console.log('Se Patcheó correctamente el usuario')
		res.status(200).send({user: userUpdated})
	})
}

module.exports = {
	getUsuarios,
	getUsuario,
	postUsuario,
	putUsuario,
	patchUsuario
}
