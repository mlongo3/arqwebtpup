'use strict'

const services = require('../services/index.js')
const Record = require('../controllers/registro.js')



//Como es un middleware, hay que agregarle next para que pase al controlador final.
function isAuth(req,res,next){			
	if(!req.headers.authorization || req.headers.authorization == 'Bearer undefined'){		
		//si no existe
		console.log('No presentó un token en authorization')
		if(req.body.email){
			Record.newRegistro(null,req.body.email,req.url,req.method,false,'advertencia','No presentó un token en authorization',412)
		}
		else{
			Record.newRegistro(null,null,req.url,req.method,false,'advertencia','No presentó un token en authorization',412)
		}
		return res.status(412).send({message: 'No tenes autorización'})
	}
	//si existe. hay que cortarlo, para que lo convierta un array.		
	
	const token = req.headers.authorization.split(' ')[1] //con esto nos queda el token

	//Dado que esto es una promesa va a tener un then y un catch.
	services.decodeToken(token)		
		.then(response => {
			req.user = response //la respuesta es el ID del usuario.			
			//Record.newRegistro(req.user,req.url,req.method,true,'info','Usuario autenticado',202) //Esto no se puede agregar, porque sinó cada vez que entra falla
			next()
			//usuarios.getUsuarioRol(req.user, (rol) => {
			/*
			usuarios.getRol(req.user, (rol) => {
				
				if(rol == 'error') {
					res.status(500).send({message: 'Se produjo un error al verificar el rol del usuario'})	
				}
				if(rol == 'noExiste'){
					res.status(404).send({message: 'El usuario ya no existe. Petición denegada'})		
				}
				else{
					//Ahora verifico si tiene o no permisos para la petición.
					//El rol puede estar en basic que seria el default, manager o admin
					console.log(`El rol asignado para este usuario es ${rol}`)
					//produjooceso lo que sea necesario de validación o salgo.	
					next()	
				}							
			})			
			*/
			//console.log(req.route)
			//if(req.route.path == '/usuarios'){console.log('quiere usuarios')}
			//console.log(req.route.methods)
			//if(req.route.methods.get){console.log('quiere get')}else{console.log('quiere otra cosa')}
			
		})
		.catch(response =>{
			//console.log(`${response.status}`) //me devuelve el numero del codigo.
			//console.log(response)
			Record.newRegistro(req.user,null,req.url,req.method,false,'advertencia',response.message,response.status)
			res.status(response.status).send({message: response.message})	
		})
}

module.exports = isAuth