'use strict'

const usuarios = require('../models/user.js')

function isAutho(req,res,next){			
	//console.log(req)
	//console.log(req.route)
	//if(req.route.path == '/usuarios'){console.log('quiere path /usuarios')}
	//console.log(req.url) // /usuarios o /usuarios?apellido=parada&skip=0
	//console.log(req.baseUrl) //  /api
	//console.log(req.originalUrl) // /api/usuarios o /api/usuarios?apellido=parada&skip=0
	//console.log(req._parsedUrl) //  
	/*
	Url {
		  protocol: null,
		  slashes: null,
		  auth: null,
		  host: null,
		  port: null,
		  hostname: null,
		  hash: null,
		  search: '?apellido=parada&skip=0',
		  query: 'apellido=parada&skip=0',
		  pathname: '/usuarios',
		  path: '/usuarios?apellido=parada&skip=0',
		  href: '/usuarios?apellido=parada&skip=0',
		  _raw: '/usuarios?apellido=parada&skip=0' }
	*/
	//console.log(req.method)  // POST GET 
	//console.log(req.route.path) // Route.path: '/usuarios'

	//console.log(req.route.methods)
	//if(req.route.methods.get){console.log('quiere get')}else{console.log('quiere otra cosa')}
	

	usuarios.getRol(req.user, (rol) => {
				
		if(rol == 'error') {
			res.status(500).send({message: 'Se produjo un error al verificar el rol del usuario'})	
		}
		if(rol == 'noExiste'){
			res.status(404).send({message: 'El token presentado es de un usuario que ya no existe. Petición denegada'})		
		}
		else{
			//Ahora verifico si tiene o no permisos para la petición.
			//El rol puede estar en basic que seria el default, manager o admin
			//console.log(`El rol asignado para este usuario es ${rol}`)
			//produjooceso lo que sea necesario de validación o salgo.

			if(rol == 'admin'){
				console.log('Es Admin pasa siempre')
				next()	
			}
			else if(rol == 'manager'){
				console.log('Es Manager')
				if(req.method == 'GET'){
					console.log('Es GET')
					next()
				}				
				else if(req.method == 'PUT'){					
					if(req.route.path == '/usuarios/:userId'){
						//
						// FALTA VALIDAR SI ES EL MANAGER DEL USUARIO o si mismo.
						//


						console.log('Tiene permisos para actualizar el usuario')

						next()	
					}
					else{
						console.log('No tiene autorizacion')
						res.status(403).send({message: 'No tenes autorizacion'})
					}				
				}
				else if(req.method == 'POST'){
					if(req.route.path == '/usuarios'){
						console.log('Tiene permisos para crear un usuario')

						next()	
					}
					else{
						console.log('No tiene autorizacion')
						res.status(403).send({message: 'No tenes autorizacion'})
					}	
				}
				else{
					console.log('No tiene autorizacion')
					res.status(403).send({message: 'No tenes autorizacion'})
				}
				
				//POST '/usuarios'
				// PUT '/usuarios/:userId' - Solo si el manager es el usuario logueado				
			}
			else if(rol == 'basic'){
				console.log('Es Basic')
				if(req.method == 'GET'){
					next()
				}
				else if (req.method == 'POST'){
					if(req.route.path == '/porton/activar'){
						console.log('El usuario tiene permisos para activar el porton')
						next()
					}
					else if (req.route.path ==  '/porton/detener'){
						console.log('El usuario tiene permisos para detener el porton')
						next()
					}
					else{
						console.log('El usuario no tiene autorizacion para ejecturar lo solicitado')
						res.status(403).send({message: 'No tenes autorizacion'})
					}					
				}
				else if (req.method == 'PUT'){
					//Solo si es si mismo.
					//console.log(req.user)
					const userToModif = req.url.split('/')[2]
					//console.log(userToModif)
					if(req.user == userToModif){
						console.log('Tenes permisos para modificarte a vos mismo')
						next()
					}
					else{
						console.log('No tenes autorizacion para modificar a otro')
						res.status(403).send({message: 'No tenes autorizacion para modificar a otro'})
					}
					
				}
				else{
					res.status(403).send({message: 'No tenes autorizacion'})
				}				
			}
			else{
				console.log('El rol no es valido, no cuadra con los soportados')
				res.status(500).send({message: 'El rol no es valido.'})
			}				
		}							
	})			
		
	//console.log(req.route)
	//if(req.route.path == '/usuarios'){console.log('quiere usuarios')}
	//console.log(req.route.methods)
	//if(req.route.methods.get){console.log('quiere get')}else{console.log('quiere otra cosa')}
	
}



module.exports = isAutho