'use strict'

const Product = require('../models/product.js')

function getProduct(req,res){
	//Vamos usar metodos que estan en la libreria de mongoose
	let productId = req.params.productId  //Guardamos en una variable lo que nos está pasando por parametro de producto.

	Product.findById(productId, (err,product) => {
		if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})

		if(!product) return res.status(404).send({message:'El producto no existe'})

		res.status(200).send({product:product}) //si la clave y el valor se llaman igual, podemos poner soslo product.
	})
}

function getProducts(req,res){
	//Al find de product le vamos a pasar un objeto vacio. Esto singnifica que me traiga todos.
	//y , la funcion de callback. un error y el array de objetos en este caso lo llamamos products
	Product.find({}, (err,products) => {
		if (err)  return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
		if (!products) return res.status(404).send({message: 'No existen productos'})

		res.status(200).send({products})
	})
}

function saveProduct(req,res){
	console.log('POST /api/product')
	console.log(req.body)
	
	let product = new Product() //creamos el producto y ahora le agregamos la data.
	product.name = req.body.name //si asi lo llamamos en el FE
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category //se tiene que corresponder con los existentes.
	product.description = req.body.description

	//como tenemos las opciones de mongo por medio de mongoose, podemos salvar.
	//recibe como parametro un err si y un productStored
	product.save( (err,productStored) => {
		//si hay error, paso del lado del servidor y damos un 500.
		if(err) res.status(500).send({message:`Error al guardar en la base de datos el producto: ${err}`})

		//sino hay error, es que funciono
		res.status(200).send({product: productStored})
	}) //cuando se almacene, mongodb le va a dar un ID.

	//res.status(200).send({message:'El producto se ha recibido'})
}

function updateProduct(req,res){
	let productId = req.params.productId  
	let update = req.body
	Product.findByIdAndUpdate(productId, update, (err,productUpdated) => {
		if(err) res.status(500).send({message: `Error al updatear el producto: ${err}`})

		res.status(200).send({product: productUpdated})
	})
}

function deleteProduct(req,res){
	let productId = req.params.productId  

	Product.findById(productId, (err,product) => {
		if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

		product.remove(err => {
			if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
 
			res.status(200).send({message: 'El producto ha sido eliminado'})
		})
	})
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}