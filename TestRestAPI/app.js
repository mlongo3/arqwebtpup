'use strict' //para utilizar nuevo tipo de variables y es buenas practicas.

//Para importar la libreria express
const express = require('express')
const bodyParser = require('body-parser') //Midleware 
//const formidable = require('express-formidable');

/*===============================
=            PARA FE            =
===============================*/
const hbs = require('express-handlebars')
/*=====  End of PARA FE  ======*/


const app = express()
//Importamos las rutas
const api = require('./routes/index.js') //Se podria remover el index.js, dado que se llama igual 

//agregarle el bodyparser a la app de express
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())



/*========================================================
=            Motor de plantillas para express            =
========================================================*/
//los archivos que sean .hbs, que usen Handlebars. y una configuración para layout, etc.
app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs' //la extension usualmente es .handlebars, lo cambiamos a .hbs
}))

//Le declaramos que el view engine es el que definimos arriba.
app.set('view engine','.hbs')
//Por defecto  Express va a utilizar las plantillas en una carpeta llamada Views

/*=====  End of Motor de plantillas para express  ======*/






app.use('/api',api) //Le decimos que la ruta /API use la constante API que tiene routes index.

/*=============================
=            Login            =
Para logi n, en lugar de mandar un estado o lo que sea. 
Enviamos res.render y le indicamos cual queremos que renderice.
=============================*/
app.get('/login', (req,res) =>{
	res.render('login')
})

app.get('/listaproductos', (req,res) =>{
	res.render('product')
})
/*=====  End of Login  ======*/








/*==============================
=            verbos            =

app.get('/api/product', ProductCtrl.getProducts )
app.get('/api/product/:productId',ProductCtrl.getProduct)
app.post('/api/product',ProductCtrl.saveProduct)
app.put('/api/product/:productId',ProductCtrl.updateProduct)
app.delete('/api/product/:productId',ProductCtrl.deleteProduct)
==============================*/
 

module.exports = app