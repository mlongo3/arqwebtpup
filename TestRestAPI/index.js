const mongoose = require('mongoose')
//mongoose.set('useFindAndModify', false);
const app = require('./app.js')
//servidor
const config = require ('./config.js')


/*=====================================================================
=            nos conectamos a la base primero del servidor            =
=====================================================================*/
// se pasa el string de conexion , una funcion de callback. 
// Un error si existiera y una respuesta.

mongoose.connect(config.db ,{ useNewUrlParser: true },(err,res) =>{
	// if (err) throw err //tira todo el error
	if(err){
		return console.log(`Error al conectar al servidor: ${err}`)
	}
	console.log('Conexión a la base de datos establecida...')

	//Ahora metemos el listen dentro del congoose connection

	//server
	// () => es lo mismo que   function()  
	app.listen(config.port, () => {
		console.log(`Servidor Web Iniciado: http://localhost:${config.port}}`)	
	})

})

/*=====  End of nos conectamos a la base primero del servidor  ======*/







