const mongoose = require('mongoose')
const app = require('./app.js')
const config = require ('./config.js')


mongoose.connect(config.db ,{ useNewUrlParser: true },(err,res) =>{
	if(err){
		console.log('\x1b[1;33;43m')
		console.log('--------------------------------------------')
		console.log(`Esta deshabilitada la verificacion de MONGODB`)
		console.log(`Si ENTRO ACA ES PORQUE ESTA BAJA LA BASE`)
		console.log('--------------------------------------------')
		console.log('\x1b[0m')
		//return console.log(`Error al conectar al servidor: ${err}`)
	}
	console.log('Conexión a la base de datos establecida...')

	app.listen(config.port, (err) => {
		if(err) console.log(err) //Eventualmente agregar registro de error.
		console.log('\x1b[42m')
		console.log('--------------------------------------------')
		console.log(`Servidor Web Iniciado: http://localhost:${config.port}`)
		console.log('--------------------------------------------')
		console.log('\x1b[0m')
	})

})



/*=============================================
=            Section comment block            =

cada uno de estos tiene 3 columnas que son dependiendo del fondo, etc.

https://bixense.com/clicolors/ 

\x1b[1;30m \x1b[0;30m \x1b[1;30;40m		negro
\x1b[1;31m \x1b[0;31m \x1b[1;31;41m		rojo
\x1b[1;32m \x1b[0;32m \x1b[1;32;42m		verde
\x1b[1;33m \x1b[0;33m \x1b[1;33;43m		amarillo
\x1b[1;34m \x1b[0;34m \x1b[1;34;44m		azul
\x1b[1;35m \x1b[0;35m \x1b[1;35;45m		violeta
\x1b[1;36m \x1b[0;36m \x1b[1;36;46m		cyan
\x1b[1;37m \x1b[0;37m \x1b[1;37;47m		gris


/*=====  End of Section comment block  ======*/




