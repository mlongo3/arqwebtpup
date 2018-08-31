'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config.js')

function createToken(user){
	//que son los datos que viajan realmente entre el cliente y el servidor. Info basica
	const payload = {
		sub: user._id, //ahora vamos a usar el mismo, pero podria ser otro para mejora
		iat: moment().unix(),//cuando se creo el token requiere instalar moment 
		exp: moment().add(14,'days').unix(),//cuando expira el token. 14 dias.
	}

	//codificar. con el secret.
	return jwt.encode(payload, config.SECRET_TOKEN) //con esto devuelve el token codificado.
}

function decodeToken(token){
	//creación de promesas //resolve cuando se cumplió y reeject cuando no.
	const decoded = new Promise((resolve,reject) =>{
		try{			
			const payload = jwt.decode(token,config.SECRET_TOKEN) //con esto nos quedaría descodificado.

			//ahora verificar si el token es valido. caducado o lo que fuese.
			//si expiro?
			if(payload.exp <= moment().unix()){
				reject({
					status:401,
					message: 'El token ha expirado'
				})
			}

			//si esta todo ok entonces.
			resolve(payload.sub)
		} catch(err){
			reject({
				status:500,
				message: 'Invalid Token'
			})
		}
	})

	return decoded	
}

module.exports = {
	createToken,
	decodeToken
}


