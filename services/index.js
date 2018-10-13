'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config.js')

function createToken(user){
	const payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(32400,'seconds').unix(),//add(14,'days') - ahora esta en 32400 9 horas
	}

	//codifico con la palabra secreta	
	return jwt.encode(payload, config.SECRET_TOKEN) //con esto devuelve el token codificado.
}

function decodeToken(token){
	//creación de promesas //resolve cuando se cumplió y reeject cuando no.
	const decoded = new Promise((resolve,reject) =>{
		try{			
			//console.log(`${token}`)
			//console.log(`${config.SECRET_TOKEN}`)

			const payload = jwt.decode(token,config.SECRET_TOKEN) //con esto nos quedaría descodificado.

			//en el payload.sub tengo el id del usuario.

			//Si expiro, ya sale directamente de acá y va al catch.
			
			//console.log(`Payload ${payload.exp}`)
			//console.log('Ahora:  ' + moment().unix())		
						
			//si esta todo ok entonces.			
			resolve(payload.sub)
		} catch(err){			
			console.log(`${err}`)
			reject({
				status:401,
				message: `${err}`
			})
		}
	})

	return decoded	
}

module.exports = {
	createToken,
	decodeToken
}


