const mongoose = require('mongoose')
const app = require('./app.js')
const config = require ('./config.js')


mongoose.connect(config.db ,{ useNewUrlParser: true },(err,res) =>{
	if(err){
		return console.log(`Error al conectar al servidor: ${err}`)
	}
	console.log('Conexión a la base de datos establecida...')

	app.listen(config.port, (err) => {
		if(err) console.log(err)
		console.log('\x1b[42m')
		console.log('--------------------------------------------')
		console.log(`Servidor Web Iniciado: http://localhost:${config.port}`)
		console.log('--------------------------------------------')
		console.log('\x1b[0m')
	})

})







