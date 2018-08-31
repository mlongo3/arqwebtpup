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

**GET** /api/alquileres - Devuelve una lista paginada de los existentes en el sistema
 - 200 Ok o 206 Partial Content
 - 500 Internal Server Error
  
**GET** /api/alquileres/<ID> - Se obtiene uno especifico por su ID.
 - 200 Ok
 - 404 Not Found - Si no lo encuentra
 - 500 Internal Server Error

**GET** /api/alquileres/<ID>/personas - Devuelve una lista paginada de las existentes en el sistema uno especifico por su ID.
 - 200 Ok
 - 404 Not Found - Si no lo encuentra
 - 500 Internal Server Error

**POST** /api/alquileres - Se crea uno nuevo
 - 200 Ok - Si lo crea correctamente
 - 400 Bad Request - si esta mal formado el request o no se puede comprender
 - 409 Conflict - Si ya existe uno
 - 500 Internal Server Error

**DELETE** /api/alquileres/<ID> - Se elimina uno especifico
 - 200 Ok - Si lo elimina correctamente
 - 500 Internal Server Error
  
 
**DELETE**  /api/alquileres/ - Se eliminan todos
 - 200 Ok - Si los elimina correctamente
 - 403 Forbidden
 - 500 Internal Server Error

**PUT** /api/alquileres/<ID> - Se Actualiza por completo todos los atributos de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error
 

**PATCH** /api/alquileres/<ID> - Se actualiza solo los atributos enviados dentro del JSON de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error

Fuera de estos: 
 - 405 Method not allowed

## Usuario ##

**GET** - /api/usuarios - Devuelve una lista con los usuarios de sistema
 - 200 Ok 
 - 500 Internal Server Error

**GET** - /api/usuarios/<ID> - Devuelve un usuario
 - 200 Ok 
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error

**GET** - /api/usuarios/<ID>/alquileres - Devuelve una lista con los disponibles para uno especifico
 - 200 Ok 
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error

**GET** - /api/usuarios/<ID>/personas - Devuelve una lista con los disponibles para uno especifico
 - 200 Ok 
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error

**POST** /api/usuarios - Se crea uno nuevo
 - 200 Ok - Si lo crea correctamente
 - 400 Bad Request - si esta mal formado el request o no se puede comprender
 - 409 Conflict - Si ya existe uno
 - 500 Internal Server Error


**DELETE** /api/usuarios/<ID> - Se elimina uno especifico
 - 200 Ok - Si lo elimina correctamente
 - 500 Internal Server Error

**PUT** /api/usuarios/<ID> - Se Actualiza por completo todos los atributos de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error
 

**PATCH** /api/usuarios/<ID> - Se actualiza solo los atributos enviados dentro del JSON de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error

 
## PERSONAS: ##

**GET** /api/personas - Devuelve una lista paginada de los existentes en el sistema
 - 200 Ok o 206 Partial Content
 - 500 Internal Server Error
  
**GET** /api/personas/<ID> - Se obtiene uno especifico por su ID.
 - 200 Ok
 - 404 Not Found - Si no lo encuentra
 - 500 Internal Server Error

**GET** /api/personas/<ID>/accesos - Devuelve una lista paginada de los existentes en el sistemapara un ID especifico.
 - 200 Ok
 - 404 Not Found - Si no lo encuentra
 - 500 Internal Server Error

**GET** /api/personas/<ID>/accesos/<ID> - Para una persona especifica devuelve un acceso especifico por su ID.
 - 200 Ok
 - 404 Not Found - Si no lo encuentra
 - 500 Internal Server Error


**POST** /api/personas - Se crea uno nuevo
 - 200 Ok - Si lo crea correctamente
 - 400 Bad Request - si esta mal formado el request o no se puede comprender
 - 409 Conflict - Si ya existe uno
 - 500 Internal Server Error

**DELETE** /api/personas/<ID> - Se elimina uno especifico
 - 200 Ok - Si lo elimina correctamente
 - 500 Internal Server Error

**DELETE**  /api/personas - Se eliminan todos
 - 403 Forbidden

**PUT** /api/1/personas/<ID> - Se Actualiza por completo todos los atributos de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error

**PATCH** /api/personas/<ID> - Se actualiza solo los atributos enviados dentro del JSON de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error


## ACCESOS: ##

**GET** /api/accesos - Devuelve una lista paginada de los existentes en el sistema
 - 200 Ok o 206 Partial Content
 - 500 Internal Server Error
 
 **GET** /api/accesos/<ID> - Se obtiene una especifica por su ID.
 - 200 Ok
 - 404 Not Found - Si no lo encuentra
 - 500 Internal Server Error

 **DELETE** /api/accesos/<ID> - Se elimina uno especifico
 - 200 Ok - Si lo elimina correctamente
 - 500 Internal Server Error
   
**DELETE**  /api/accesos - Se eliminan todos
 - 403 Forbidden
 - 500 Internal Server Error

**PUT** /api/accesos/<ID> - Se Actualiza por completo todos los atributos de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error
 
**PATCH** /api/accesos/<ID> - Se actualiza solo los atributos enviados dentro del JSON de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error 
 
**GET** /api/accesos/tarjetas - Devuelve una lista paginada de las existentes en el sistema
 - 200 Ok o 206 Partial Content
 - 500 Internal Server Error

**GET** /api/accesos/socialnet - Devuelve una lista paginada de las existentes en el sistema
 - 200 Ok o 206 Partial Content
 - 500 Internal Server Error

**POST** /api/accesos/tarjetas - Se crea uno nuevo
 - 200 Ok - Si lo crea correctamente
 - 400 Bad Request - si esta mal formado el request o no se puede comprender
 - 409 Conflict - Si ya existe uno
 - 500 Internal Server Error

**POST** /api/accesos/socialsnet - Se crea uno nuevo
 - 200 Ok - Si lo crea correctamente
 - 400 Bad Request - si esta mal formado el request o no se puede comprender
 - 409 Conflict - Si ya existe uno
 - 500 Internal Server Error


Fuera de estos: 
 - 405 Method not allowed


## Recursos: ##

**GET** - /api/recursos - Devuelve una lista paginada de los existentes en el sistema
 - 200 Ok o 206 Partial Content
 - 500 Internal Server Error
 
 **DELETE**  /api/recursos/ - Se eliminan todos
 - 403 Forbidden

**GET** /api/recursos/entradas - Devuelve una lista paginada de las existentes en el sistema
 - 200 Ok o 206 Partial Content
 - 500 Internal Server Error

**DELETE** /api/recursos/entradas/<ID> - Se elimina uno especifico
 - 200 Ok - Si lo elimina correctamente
 - 500 Internal Server Error
 
 **POST** /api/recursos/entradas - Se crea uno nuevo
 - 200 Ok - Si lo crea correctamente
 - 400 Bad Request - si esta mal formado el request o no se puede comprender
 - 409 Conflict - Si ya existe uno
 - 500 Internal Server Error
 
**GET** /api/recursos/salidas - Devuelve una lista paginada de las existentes en el sistema
 - 200 Ok o 206 Partial Content
 - 500 Internal Server Error

 **DELETE**  /api/recursos/entradas - Se eliminan todos
 - 403 Forbidden

**PUT** /api/recursos/entradas/<ID> - Se Actualiza por completo todos los atributos de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error
 
**PATCH** /api/recursos/entradas/<ID> - Se actualiza solo los atributos enviados dentro del JSON de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error

**POST** /api/recursos/salidas - Se crea uno nuevo
 - 200 Ok - Si lo crea correctamente
 - 400 Bad Request - si esta mal formado el request o no se puede comprender
 - 409 Conflict - Si ya existe uno
 - 500 Internal Server Error
  
**DELETE** /api/recursos/salidas/<ID> - Se elimina uno especifico
 - 200 Ok - Si lo elimina correctamente
 - 500 Internal Server Error

 **DELETE**  /api/recursos/salidas - Se eliminan todos
 - 403 Forbidden
 
**PUT** /api/recursos/salidas/<ID> - Se Actualiza por completo todos los atributos de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error


**PATCH** /api/recursos/salidas/<ID> - Se actualiza solo los atributos enviados dentro del JSON de uno especifico
 - 200 Ok - Si lo actualiza correctamente
 - 404 Not Found - si no se encuentra
 - 500 Internal Server Error

Fuera de estos: 
405 Method not allowed