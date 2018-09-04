'use strict'

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema

//Creamos el modelo.
const ProductSchema = Schema({
	name: String,
	picture: String,
	price: { type:Number, default: 0},
	category: {type: String, enum: ['computers','phones','accesories']},
	description: String
})

//Para exportar este modelo - Le damos un nombre y un schema.
module.exports = mongoose.model('Product', ProductSchema)

//PAra importar el modelo a la aplicación, hay que hacer un import desde el index.js
//const Product = require('./models/product')