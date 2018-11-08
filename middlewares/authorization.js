'use strict'

const User = require('../models/user.js')
const Record = require('../controllers/registro.js')

function isAutho(req,res,next){			
	
	User.getUsuario(req.user, (usr) => {
		//console.log(usr)		
		//Verifico si el usuario está habilitado
		//console.log(req.method)
		if(!usr.habilitado){
			console.log('Usuario deshabilitado')
			Record.newRegistro(req.user,req.url,req.method,false,'advertencia','El usuario está deshabilitado',404)
			res.status(404).send({message: 'El usuario está deshabilitado'})		
		}
		else{			
			if(usr.role == 'error') {
				Record.newRegistro(req.user,req.url,req.method,false,'error','No se puede obtener el rol',500)
				res.status(500).send({message: 'Se produjo un error al verificar el rol del usuario'})	
			}
			else if(usr.role == 'noExiste'){
				Record.newRegistro(req.user,req.url,req.method,false,'advertencia','El rol definido no existe',404)
				res.status(404).send({message: 'El token presentado es de un usuario que ya no existe. Petición denegada'})		
			}			
			else if(usr.role == 'admin'){
				//console.log('Es Admin pasa siempre')
				
				//Por si se requiere parsear, se puede modificar esto, para cargar datos especificos de la query si existen.
				if(Object.keys(req.query).length > 0) {					
					//console.log(req.url)
					if( !req.url == '/porton/getestado' || !req.url == '/luces/estadoPrimarias' || !req.url == '/luces/estadoSecundarias' ) {
						Record.newRegistro(req.user,req.url,req.method,true,'info','Tiene rol de Admin, accede directamente',202)	
				
					}
					else{
				
					}					
				}
				else{
				
					if(!req.url == '/porton/getestado' || !req.url == '/luces/estadoPrimarias' || !req.url == '/luces/estadoSecundarias'){
						Record.newRegistro(req.user,req.url,req.method,true,'info','Tiene rol de Admin, accede directamente',202)	
				
					}
					else{
				
					}					
				}				
				next()	
			}
			else if(usr.role == 'manager'){
				console.log('Es Manager')
				if(req.method == 'GET'){
					//console.log('Es GET')
					//Si pide usuarios, limito que puede ver.
					if(req.route.path == '/usuarios'){						
						//Devuelve todos los usuarios que lo tienen como manager.
						User.findDependientesManager(req.user,req.query, function (err,usuario) {
							if(err){
								Record.newRegistro(req.user,req.url,req.method,false,'error','No se validar el manager',500)
								return res.status(500).send({message:`Error al realizar la peticion: ${err}`})	
							} 
							if(!usuario){
								Record.newRegistro(req.user,req.url,req.method,false,'advertencia','El rol definido no existe',404)
								return res.status(404).send({message:`No hay usuarios dependientes de este manager`})
							}
							else{
								Record.newRegistro(req.user,req.url,req.method,true,'info','Manager validado',200)
								res.status(200).send({usuarios:usuario}) 
							}							
						})
					}
					else{
						if(!req.url == '/porton/getestado' || !req.url == '/luces/estadoPrimarias' || !req.url == '/luces/estadoSecundarias'){
							Record.newRegistro(req.user,req.url,req.method,true,'info','Acceso permitido.',200)
						}
						next()
					}
				}
				else if(req.method == 'PUT'){					
					//Update de un usuario
					if(req.route.path == '/usuarios/:userId'){
						console.log(`usuario que dispara acción ${req.user}`)
						
						console.log(`usuario a actualizar       ${req.params.userId}`)

						if(req.user == req.params.userId){
							console.log('El manager quiere modificarse a si mismo')
							Record.newRegistro(req.user,req.url,req.method,true,'info','Acceso permitido.El manager quiere modificarse a si mismo',200)
							next()
						}
						else{
							//Verifico si es manager del usuario a modificar.
							User.getManager( req.params.userId, (manag) =>{
								if(manag == 'error' || manag == 'noExiste'){
									Record.newRegistro(req.user,req.url,req.method,false,'advertencia','No existe el manager',404)
									res.status(404).send({message: 'No existe el manager'})		
								}
								else{
									console.log(`el manager del usuario  es ${manag}`)	
									console.log('ahora verifico si es manager de ese usuario')

									if(req.user == manag){
										console.log('El que pide es manager del usuario a modificar')
										Record.newRegistro(req.user,req.url,req.method,true,'info','Acceso permitido.El manager quiere está modificando',202)
										next()
									}
									else{
										console.log('No tiene permisos para modificar a este usuario')
										Record.newRegistro(req.user,req.url,req.method,false,'advertencia','No tiene permisos para modificar a este usuario',404)
										res.status(404).send({message: 'No tiene permisos para modificar a este usuario'})		
									}
								}
							})
						}
					}
					else{
						console.log('No tiene autorizacion para modificar')
						Record.newRegistro(req.user,req.url,req.method,false,'advertencia','No tiene autorización para modificar',403)
						res.status(403).send({message: 'No tenes autorizacion para modificar'})
					}				
				}
				else if(req.method == 'POST'){
					//Crear un usuario
					if(req.route.path == '/usuarios'){
						console.log('Tiene permisos para crear un usuario')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El usuario tiene permisos para crear un usuario',202)
						next()	
					}
					else if(req.route.path == '/porton/activar'){
						console.log('El usuario tiene permisos para activar el porton')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El usuario tiene permisos para activar el porton',202)
						next()
					}
					else if (req.route.path ==  '/porton/detener'){
						console.log('El usuario tiene permisos para detener el porton')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El usuario tiene permisos para detener el porton',202)
						next()
					}
					else if (req.route.path == '/luces/activarPrimarias' || req.route.path ==  '/luces/activarSecundarias'){
						console.log('El usuario tiene permisos para encender luces')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El usuario tiene permisos para encender las luces',202)
						next()
					}
					else{
						console.log('No tiene autorizacion para crear')
						Record.newRegistro(req.user,req.url,req.method,false,'advertencia','No tiene autorización para crear',403)
						res.status(403).send({message: 'No tenes autorizacion  para crear'})
					}	
				}
				else if(req.method == 'PATCH' && req.route.path == '/usuarios/:userId/password'){
					//Verifico si es si mismo
					if(req.user == req.params.userId){
						console.log('El reseteo es solicitado por si mismo')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El reseteo es solicitado por si mismo',202)
						next()
					}
					else{
						//Tengo que verificar si es manager.
						User.getManager( req.params.userId, (manag) =>{
								if(manag == 'error' || manag == 'noExiste'){
									Record.newRegistro(req.user,req.url,req.method,false,'advertencia','No existe el manager del usuario',404)
									res.status(404).send({message: 'No existe el manager del usuario'})		
								}
								else{
									console.log(`el manager del usuario  es ${manag}`)	
									console.log('verificando permisos de manager')

									if(req.user == manag){
										console.log('El reseteo es solicitado por el manager')
										Record.newRegistro(req.user,req.url,req.method,true,'info','El reseteo es solicitado por el manager',202)
										next()
									}
									else{
										console.log('No tiene permisos para resetear la pass a este usuario')
										Record.newRegistro(req.user,req.url,req.method,false,'advertencia','No tiene autorización para resetear la password del usuario',403)
										res.status(403).send({message: 'No tiene permisos para resetear la pass a este usuario'})		
									}
								}
						})
					}
				}
				else{
					console.log('No tiene autorizacion')
					Record.newRegistro(req.user,req.url,req.method,false,'advertencia','No tiene autorización',403)
					res.status(403).send({message: 'No tene autorizacion'})
				}
			}			
			else if(usr.role == 'basic'){
				console.log('Es Basic')
				if(req.method == 'GET'){
					//console.log('Es GET')
					//Si pide usuarios, limito a si mismo.
					if(req.route.path == '/usuarios'){						
						//Devuelve todos los usuarios que lo tienen como manager.						
						User.findById(req.user, (err,usuario) => {
							if(err){
								Record.newRegistro(req.user,req.url,req.method,false,'error','Error en la busqueda del usuario',500)
								return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
							} 
							if(!usuario) {
								Record.newRegistro(req.user,req.url,req.method,false,'advertencia','El usuario no existe',404)
								return res.status(404).send({message:`El usuario ${req.user} no existe`})
							}
							else{
								Record.newRegistro(req.user,req.url,req.method,true,'info','Acceso permitido',202)
								res.status(200).send({usuarios:usuario}) 	
							}
							
						})
					}
					else{
						if(!req.url == '/porton/getestado' || !req.url == '/luces/estadoPrimarias' || !req.url == '/luces/estadoSecundarias'){
							Record.newRegistro(req.user,req.url,req.method,true,'info','Acceso permitido',202)
						}						
						next()
					}
				}
				else if (req.method == 'POST'){
					if(req.route.path == '/porton/activar'){
						console.log('El usuario tiene permisos para activar el porton')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El usuario tiene permisos para activar el porton',202)
						next()
					}
					else if (req.route.path ==  '/porton/detener'){
						console.log('El usuario tiene permisos para detener el porton')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El usuario tiene permisos para detener el porton',202)
						next()
					}
					else if (req.route.path == '/luces/activarPrimarias' || req.route.path ==  '/luces/activarSecundarias'){
						console.log('El usuario tiene permisos para encender luces')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El usuario tiene permisos para encender las luces',202)
						next()
					}
					else{
						console.log('El usuario no tiene autorizacion para ejecturar lo solicitado')
						Record.newRegistro(req.user,req.url,req.method,false,'advertencia','El usuario no tiene autorizacion para ejecturar lo solicitado',403)
						res.status(403).send({message: 'El usuario no tiene autorizacion para ejecturar lo solicitado'})
					}					
				}
				else if (req.method == 'PUT'){
					//Solo si es si mismo.
					//console.log(req.user)
					//console.log(req.params.userId)					
					var userToModif = req.params.userId // a mano es  req.url.split('/')[2]
					//console.log(userToModif)
					if(req.user == userToModif){
						console.log('El usuario tiene permisos para modificarse a si mismo')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El usuario tiene permisos para modificarse a si mismo',202)
						next()
					}
					else{
						console.log('No tiene permisos para modificar a otro usuario')
						Record.newRegistro(req.user,req.url,req.method,false,'advertencia','No tiene permisos para modificar a otro usuario',403)
						res.status(403).send({message: 'No tiene permisos para modificar a otro usuario'})
					}
				}
				else if (req.method == 'PATCH' && req.route.path == '/usuarios/:userId/password'){
					var userToModif = req.params.userId
					if(req.user == userToModif){
						console.log('El usuario tiene permisos para resetearse tu password')
						Record.newRegistro(req.user,req.url,req.method,true,'info','El usuario tiene permisos para resetearse tu password',202)
						next()
					}
					else{
						console.log('El usuario no tiene autorizacion resetearle la password a otro')
						Record.newRegistro(req.user,req.url,req.method,false,'advertencia','El usuario no tiene autorizacion resetearle la password a otro',403)
						res.status(403).send({message: 'El usuario no tiene autorizacion resetearle la password a otro'})
					}
				}
				else{
					console.log('El usuario no tiene autorización')
					Record.newRegistro(req.user,req.url,req.method,false,'advertencia','El usuario no tiene autorización',403)
					res.status(403).send({message: 'El usuario no tiene autorización'})
				}				
			}
			else{
				console.log('El rol no es valido, no cuadra con los soportados')
				Record.newRegistro(req.user,req.url,req.method,false,'error','El rol no es valido, no cuadra con los soportados',500)
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

/*=============================================
Un Admin puede: Hacer todo.
-----------------------------------------------
Un manager puede:
- GET All
-- /usuarios - Condicional. Devuelve una lista con los usuarios del que es manager.

- POST
-- /usuarios
-- /porton/activar
-- /porton/detener

- PUT
-- /usuarios/:userId - Solo si es manager del usuario a modificar o si mismo.
-- /porton/activar
-- /porton/detener

-----------------------------------------------
Un basic puede:
- GET All
-- /usuarios - Condicional. Devuelve solo el usuario que solicitó la consulta.

- PUT
-- /usuarios/:userId - Solo si es si mismo.
-- /porton/activar
-- /porton/detener

- PATCH
-- /usuarios/:userId/password  - Solo a si mismo

=============================================*/


//PARA TS

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
	

