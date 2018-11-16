SMARTGARAGE
===========

**Nombre del grupo:** MARLON

**Integrantes:**
  - Sebastian Martin
  - Mariano Longo
  
**Descripción del negocio elegido:**
Creación de un sistema que permita al dueño tener acceso y manejo a ciertos recursos de un Garaje de forma remota, como así también brindar el acceso de forma segura a sus clientes y tener registros confiables de los sucesos.

## Descripción ##
Usualmente, estas soluciones están basadas en componentes de electrónica y algunas pueden conectarse para trabajar en conjunto, como ser encendido de luces ante un acceso y por un tiempo determinado. El registro no indicará mucho más de fecha y hora en formato texto. Adicionalmente, hay soluciones de cámaras web, incluso con activación por detección de movimiento, pero terminan siendo soluciones independientes y no integradas o muy costosas.
Estos Garaje están constantemente cerrados (dado que no hay personal presente), y el acceso es por medio de portones automaticos. 


*********
# ENDPOINTS


#### Global del Handler
`Posibles respuestas`
 - 200 Ok
 - 400 Bad Request 
 - 403 Forbidden
 - 404 Not Found
 - 409 Conflict - Si ya existe uno
 - 500 Internal Server Error
 - TBD
  
 
## ALQUILERES ##

**GET** /api/alquileres
`Query String soportados`
	?order=ASC&limit=10&offset=0 - Devuelve una lista paginada con los 10 primeros registros de forma ascendente.
	usuarioResp - Usuario responsable del alquiler
	nombre - Nombre designado para el alquiler

`Respuestas`
 - 200 OK
	({alquiler:alquiler})
	({Alquileres})
	
 - 404 Not Found
	({message:`Alquileres para el usuario ${usuario} no existen`})
	({message:`El idPublico ${idPublico} no existe`})
	({message: 'No existen Alquileres'})
	({message:`El alquiler ${alquilerId} no existe`})
 
 - 500 Internal Server Error
	({message:`Error al realizar la peticion: ${err}`})
  
**GET** /api/alquileres/`<ID>` - Se obtiene uno especifico por su ID.
`Respuestas`
 - 200 OK
	({alquiler:alquiler})
	
 - 404 Not Found
	({message:`El alquiler ${alquilerId} no existe`})
	
- 500 Internal Server Error
	({message:`Error al realizar la peticion: ${err}`})
  
**POST** /api/alquileres - Se crea uno nuevo
`Respuestas`
 - 201 Created
	({alquiler: alquilerStored})
	
 - 409 Conflict
	({message: 'Ya existe uno igual!'})
	
 - 500 Internal Server Error
	({message:`Error al guardar en la base de datos: ${err}`})

**DELETE** /api/alquileres/`<ID>` - Se elimina uno especifico
`Respuestas`
 - 200 Ok
	({message: 'El Alquiler ha sido eliminado'})

 - 404 Not Found
	({message: 'El Alquiler no existia'})
	
 - 500 Internal Server Error
	({message: `Error al borrar el Alquiler: ${err}`})
  
**PUT** /api/alquileres/`<ID>` - Se Actualiza por completo todos los atributos de uno especifico
 `Respuestas`
 - 202 Accepted
	({alquiler:alquilerUpdated})
	
 - 404 Not Found 
	({message: `El Alquiler no existe`})
	
 - 500 Internal Server Error
	({message: `Error al actualizar el Alquiler: ${err}`})

**PATCH** /api/alquileres/`<ID>` 
 `IDEM PUT, Dado que el manejo por Mongoose es similar al put, solo hace update de los campos pasados`


## Usuario ##
**GET** - /api/usuarios - Devuelve un listado de usuarios
`Query String soportados`
	?order=ASC&limit=10&offset=0 - Devuelve una lista paginada con los 10 primeros registros de forma ascendente.
	email - Devuelve un registro que coincida con el campo email
	apellido - Devuelve un listado que coincida con el campo apellido
	role - Devuelve un listado que coincida con el campo rol
	
`Popula: Para el manger, el displayName`	

`Respuestas`
 - 200 Ok 
 - 500 Internal Server Error
	

**GET** - /api/usuarios?email=`<email>` - Devuelve el usuario con el email especificado
`Respuestas`
 - 200 Ok 
	({user:user})
	
 - 404 Not Found
 ({message:`El email ${email} no existe`})
 
 - 500 Internal Server Error
	({message:`Error al realizar la peticion: ${err}`})

**GET** - /api/usuarios/`<ID>` - Devuelve un usuario
`Respuestas`
 - 200 Ok 
	({user:user})
	
 - 404 Not Found
	({message:`El usuario ${userId} no existe`})
 
 - 500 Internal Server Error
	({message:`Error al realizar la peticion: ${err}`})

**GET** - /api/usuarios?apellido=`<apellido>`&order=`<ASC o DSC>`&limit=`<int>`&skip=`<int>` - Devuelve una lista con los usuarios de sistema con el apellido especificado
`Respuestas`
 - 200 Ok 
	({user:user})

 - 404 Not Found	
	({message:`El apellido ${apellido} no existe`})
	
 - 500 Internal Server Error
	({message:`Error al realizar la peticion: ${err}`})

 **GET** - /api/usuarios?role=`<role>`&order=`<ASC o DSC>`&limit=`<int>`&skip=`<int>` - Devuelve una lista con los usuarios de sistema con el rol especificado
`Respuestas`
 - 200 Ok 
	({user:user}) 
	
 - 404 Not Found
	({message:`El role ${role} no existe`})
	
 - 500 Internal Server Error
	({message:`Error al realizar la peticion: ${err}`})
 

**POST** /api/usuarios - Se crea uno nuevo
`Respuestas`
- 201 Created
	({user: userStored})
	
 - 409 Conflict
	({message: 'Ya existe uno igual!'})
	
 - 500 Internal Server Error
	({message:`Error al guardar en la base de datos: ${err}`})


**DELETE** /api/usuarios/`<ID>` - Se elimina uno especifico
`Respuestas`
 - 200 Ok
	({message: 'El usuario ha sido eliminado'})

 - 404 Not Found
	({message: 'El usuario no existia'})
	
 - 500 Internal Server Error
	({message: `Error al borrar el usuario: ${err}`})

**PUT** /api/usuarios/`<ID>` - Se Actualiza por completo todos los atributos de uno especifico
`Respuestas`
 - 202 Accepted
	({user:userUpdated})
	
 - 404 Not Found 
	({message: `El usuario no existe`})
	
 - 500 Internal Server Error
	({message: `Error al actualizar el usuario: ${err}`})

 

**PATCH** /api/usuarios/`<ID>` - Se actualiza solo los atributos enviados dentro del JSON de uno especifico
`Respuestas`
 `IDEM PUT, Dado que el manejo por Mongoose es similar al put, solo hace update de los campos pasados`


 **PATCH** /api/usuarios/`<ID>`/password - Se actualiza la password
`Respuestas`
- 202 Accepted
	({Se cambió la password existosamente})
	
 - 404 Not Found 
	({message: `El usuario no existe`})

- 406 Not Acceptable
	({message: `La password debe contener al menos ${passLength} caracteres.`})
	
 - 500 Internal Server Error
	({message: `Error al actualizar la passwrod del usuario: ${err}`})
	({message:'Error con el hash de la password'})
	({message:'Error con el salt de la password'})

 
## ACCESOS: ##
**GET** /api/accesos
`Query String soportados`
	?order=ASC&limit=10&offset=0 - Devuelve una lista paginada con los 10 primeros registros de forma ascendente.
	usuario - Usuario responsable del acceso
	idPublico - identificado publico de este acceso.

`Respuestas`
 - 200 OK
	({acceso:acceso})
	
 - 404 Not Found
	({message:`No existen accesos para el usuario ${usuario}`})
	({message:`El idPublico ${idPublico} no existe`})
	({message: 'No existen Accesos'})
 
 - 500 Internal Server Error
	({message:`Error al realizar la peticion: ${err}`})

`Popula: Para el usuario, displayName + habilitado y el usuario.alquieler` 

**GET** /api/accesos/`<ID>` - Se obtiene uno especifico por su ID.
`Respuestas`
 - 200 OK
	({acceso:acceso}) 
	
 - 404 Not Found
	({message:`El acceso ${accesoId} no existe`})
	
- 500 Internal Server Error
	({message:`Error al realizar la peticion: ${err}`})
  
**POST** /api/accesos - Se crea uno nuevo
`Respuestas`
 - 201 Created
	({acceso: Accesostored})
	
 - 409 Conflict
	({message: 'Ya existe uno igual!'})
	
 - 500 Internal Server Error
	({message:`Error al guardar en la base de datos: ${err}`})

**DELETE** /api/accesos/`<ID>` - Se elimina uno especifico
`Respuestas`
 - 200 Ok
	({message: 'El acceso ha sido eliminado'})

 - 404 Not Found
	({message: 'El acceso no existia'})
	
 - 500 Internal Server Error
	({message: `Error al borrar el acceso: ${err}`})
  
**PUT** /api/accesos/`<ID>` - Se Actualiza por completo todos los atributos de uno especifico
 `Respuestas`
 - 202 Accepted
	({acceso:AccesoUpdated})
	
 - 404 Not Found 
	({message: `El acceso no existe`})
	
 - 500 Internal Server Error
	({message: `Error al actualizar el acceso: ${err}`})

**PATCH** /api/accesos/`<ID>` 
 `IDEM PUT, Dado que el manejo por Mongoose es similar al put, solo hace update de los campos pasados`


 ## AUTH: ##
 
**POST** /signin - Inicio de sesion
`Respuestas`
 - 200 Ok
	({ 
      	msg: 'Te has logueado correctamente', 
      	token: service.createToken(user), 
      	rol: `${user.role}`, 
      	displayName: `${user.displayName}`,       	
      	_id: `${user._id}`
      })
	
 - 401 Unauthorized
	({ msg: 'Error de contraseña'}) 

- 404 Not Found
	({ msg: `No existe el usuario: ${req.body.email}` })
	
 - 500 Internal Server Error
	({msg: `Error al ingresar: ${err}`})
	
**POST** /signup - registración - No utilizado
`Respuestas`
 - 201 Created
	({msg: 'usuario creado correctamente',token: service.createToken(user)})
	
 - 409 Conflict
	({msg: 'Ya existe uno igual!'})
	
 - 500 Internal Server Error
	({msg:`Error al crear el usuario: ${err}`})
	
## LUCES: ##

**GET** /api/luces/estadoPrimarias
`Respuestas`
 - 200 Ok - 0 apagadas / 1 encendidas
	({estado:`${callback}`})

**GET** /api/luces/estadoSecundarias
`Respuestas`
 - 200 Ok - 0 apagadas / 1 encendidas
	({estado:`${callback}`})

**POST** /api/luces/activar
`Respuestas`
 - 200 Ok
	({"message": "Encendiendo luces primarias y Encendiendo luces secundarias"})

**POST** /api/luces/desactivar
`Respuestas`
 - 200 Ok
	({"message": "Apagando luces primarias y Apagando luces secundarias"})

**POST** /api/luces/activarPrimarias
`Respuestas`
 - 200 Ok
	({"message": "Encendiendo luces primarias"})
	
**POST** /api/luces/desactivarPrimarias
`Respuestas`
 - 200 Ok
	({"message": "Apagando luces primarias"})

**POST** /api/luces/activarSecundarias
`Respuestas`
 - 200 Ok
	({"message": "Encendiendo luces secundarias"})
	
**POST** /api/luces/desactivarSecundarias
`Respuestas`
 - 200 Ok
	({"message": "Apagando luces secundarias"})


## PORTON: ##

**GET** /api/porton/getestado
`Respuestas`
 - 200 Ok - estado = detenido, accionando, abriendo, esperando, cerrando, cerrado
	({message:`${estado}`})
	
**POST** /api/porton/activar - Acciona el porton independientemente el sentido.
`Respuestas`
 - 200 Ok
	({"message": "Apagando luces primarias"})
	
**POST** /api/porton/detener - Detiene cualquier proceso que esté haciendo el porton.
`Respuestas`
 - 200 Ok
	({message:'Se detuvo el porton'})
	({'Detengo todo por segunda activación'})
	({'Accionando el porton...'})	
	
## CAMARA: ##

**POST** /api/camara/capturar
`Query String soportados`
	?camara=int o camara=ext

`Respuestas`
 - 201 Created
	({fotoInterna:`${fni}`,fotoExterna:`${fne}`}) - Ambas
	({fotoInterna:'',fotoExterna:`${fne}`})	- Solo la externa
	({fotoInterna:`${fni}`,fotoExterna:''})	- Sola la interna
	
 - 400 Bad Request
	({fotoInterna:'',fotoExterna:''})
	
 - 500 Internal Server Error
	({fotoInterna:'',fotoExterna:`${err}`}) - falló la externa
	({fotoInterna:`${err}`,fotoExterna:''}) - falló la interna
	({fotoInterna:`${err}`,fotoExterna:`${err}`}) - fallaron ambas
	
## MOVIMIENTO: ##

**GET** /api/movimiento/estado
`Respuestas`
 - 200 Ok 
	({message:`${estado}`})
	
**POST** /api/movimiento/activar
`Respuestas`
 - 202 Accepted
	({message:'activado'})
	
**POST** /api/movimiento/desactivar
`Respuestas`
 - 202 Accepted
	({message:'desactivado'})	
	
## REGISTROS: ##

**GET** /api/registros
`Respuestas`
 - 200 OK
	({registros})

 - 404 Not Found
	({message: 'No existen registros'})
 
 - 500 Internal Server Error
	({message:`Error al realizar la peticion: ${err}`})

`Popula: Para el userId, el displayName, para el alquilerId, el nombre, para el managerId, el displayName y hace el sort Descendiente`	
	
**POST** /api/registros
`Respuestas`
 - 201 Created
	({record: recStored})
		
 - 500 Internal Server Error
	({message:`Error al guardar en la base de datos: ${err}`})
	
## LECTOR: ##

**GET** /api/lector/leer
`Respuestas`
 - 200 OK
	({message: 'ok',Id: lectura,Usuario: acc.usuario}) 
	
 - 404 Not Found
	({message: 'ok',Id: lectura,Usuario: 'No asociado'}) 
	
 - 408 Request Time-out
	({message: 'timeout',Id: null,Usuario: null})
	
 - 500 Internal Server Error
	({message: 'error',Id: null,Usuario: null})
	({message: 'error',Id: lectura,Usuario: 'error'}) 