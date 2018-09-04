'use strict'

const express = require('express')
const ProductCtrl = require('../controllers/product.js')
const userCtrl = require('../controllers/user.js')
const auth = require('../middlewares/auth.js')
const api = express.Router()


api.get('/product', ProductCtrl.getProducts )
api.get('/product/:productId',ProductCtrl.getProduct)
api.post('/product', auth, ProductCtrl.saveProduct)
api.put('/product/:productId', auth, ProductCtrl.updateProduct)
api.delete('/product/:productId',auth, ProductCtrl.deleteProduct)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
//antes de que se ejecute function, podemos poner cualquier cosa que querramos.
//ejecuta auth.isAuth, si está todo ok, hace next() y pasa a la function de aqui. 
//.isAuth, ahora se saca, porque luego del refactor, queda esa unica funcion.
api.get('/private', auth , (req,res) => {
	res.status(200).send({message: 'Tienes acceso'})
}) //esta ruta es para testear el acceso autorizado.




module.exports = api 