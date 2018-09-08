'use strict'

const services = require('../services/index.js')

//Como es un middleware, hay que agregarle next para que pase al controlador final.
function isAuth(req,res,next){			
	if(!req.headers.authorization || req.headers.authorization == 'Bearer undefined'){		
		//si no existe
		console.log('No presentó un token en authorization')
		return res.status(403).send({message: 'No tenes autorización'})
	}
	//si existe. hay que cortarlo, para que lo convierta un array.		
	const token = req.headers.authorization.split(' ')[1] //con esto nos queda el token

	//Dado que esto es una promesa va a tener un then y un catch.
	services.decodeToken(token)		
		.then(response => {
			req.user = response
			next()
		})
		.catch(response =>{
			//console.log(`${response.status}`) //me devuelve el numero del codigo.
			res.status(response.status).send({message: response.message})	
		})
	
}

module.exports = isAuth