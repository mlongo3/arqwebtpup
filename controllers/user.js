'use strict'

const User = require('../models/user.js')


function getUsuarios(req,res){
	console.log('Listando usuarios: ')
	User.find({}, (err,usuarios) => {		
		if (err)  return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
		if (!usuarios) return res.status(404).send({message: 'No existen usuarios'})
		res.status(200).send({usuarios})
	})
}


module.exports = {
	getUsuarios
}
