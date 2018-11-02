'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const hbs = require('express-handlebars')

const app = express()
const api = require('./routes/index.js') 

//app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

 
app.engine('.hbs', hbs({
	//defaultLayout: 'default',
	extname: '.hbs'
}))

app.set('view engine','.hbs')
app.use('/api',api)

//Rutas Auth - path de escucha, y que redenderizo.
app.get('/auth/login', (req,res) =>{
	res.render('login')
})

app.get('/auth/register', (req,res) =>{
	res.render('register')
})

app.get('/listausuarios',(req,res) =>{
	res.render('usuarios')
})

app.get('/private',(req,res) =>{
	res.render('private')
})

app.get('/porton',(req,res) =>{
	res.render('porton')
})

app.get('/paradaemergencia',(req,res) =>{
	res.render('paradaemergencia')
})

app.get('/usuarios/:id',(req,res) =>{
	res.render('usuarioById')
})

app.get('/perfilUsuario',(req,res) =>{
	res.render('perfilUsuario')
})

app.get('/listaAlquiler',(req,res) =>{
	res.render('alquileres')
})

app.get('/alquileres/:idAlquiler',(req,res) =>{
	res.render('alquilerById')
})

/*==============================
=            verbos            =

app.get('/api/product', ProductCtrl.getProducts )
app.get('/api/product/:productId',ProductCtrl.getProduct)
app.post('/api/product',ProductCtrl.saveProduct)
app.put('/api/product/:productId',ProductCtrl.updateProduct)
app.delete('/api/product/:productId',ProductCtrl.deleteProduct)
==============================*/
 app.use(express.static(__dirname + '/views'));

module.exports = app