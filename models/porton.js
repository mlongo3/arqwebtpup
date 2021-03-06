'use strict'
//LISTO COMPLETAMENTE FUNCIONAL EN commando, fallo en Require.
const Gpio = require('onoff').Gpio; 
const luces = require('./luz.js')

// Constructor
function Porton() {
  	this.portonCerrado = new Gpio(19, 'in', 'rising', {debounceTimeout: 100}); 
	this.portonAbierto = new Gpio(13, 'in', 'rising', {debounceTimeout: 100}); 
	this.fotoCelula = new Gpio(5, 'in', 'rising', { debounceTimeout : 100 });
	//this.paradaEmergencia = new Gpio(6,'in','rising'); 
	this.abriendo = new Gpio(20, 'out'); 
	this.abriendo.writeSync(1)
	this.cerrando = new Gpio(21, 'out'); 
	this.cerrando.writeSync(1)
	this.luzVerde = new Gpio(16, 'out'); 
	this.luzRoja = new Gpio(12, 'out');
	var intervaloParpadeo;
	//clearInterval(intervaloParpadeo); 	
	this.tiempoDeEsperaApertura = 5000; //5 segundos
	this.tiempoDeEsperaCierre = 3000; //3 segundos
	this.tiempoDeBlink = 250;	
	this.timeoutApagarLuzVerde = '';
	this.timeoutPortonCerrado = '';
	this.timeoutBajarPorton = '';
	this.enProceso = 'detenido'; //['detenido','accionando','abriendo','cerrando','esperando']
}

// class methods - si es necesario ponerlo en el Porton.prototype.cambiar....
Porton.prototype.GetEstado = function(){	
	return this.enProceso
}

Porton.prototype.GetPortonCerrado = function(){	
	return this.portonCerrado.readSync()
}

Porton.prototype.GetPortonAbierto = function(){	
	return this.portonAbierto.readSync()
}

Porton.prototype.GetFotoCelula = function(){	
	return this.fotoCelula.readSync()
}

//COMANDOS
Porton.prototype.AccionarPorton = function(callback){	
	if(this.enProceso != 'detenido'){
		//Si está en proceso, detengo todo.				
		this.stop();		
		return callback('Detengo todo por segunda activación')				
	}
	else{
		this.enProceso = 'accionando';						
		this.AbrirPorton()
		return callback('Accionando el porton...')		
	}
	//return callback 		
}

Porton.prototype.AbrirPorton = function(){	
	if(this.portonAbierto.readSync() || (this.abriendo.readSync() ^ 1) || (this.cerrando.readSync() ^ 1)){		
		if(this.portonAbierto.readSync()){		
			console.log('--Ya está abierto, asique lo cierro--')				
			this.CerrarPorton()
		}
		else if(this.abriendo.readSync() ^ 1){
			console.log('--Ya está abriendo--')
			this.stop()				
		}
		else{
			console.log('--Está Cerrando... Detengo la marcha--')					
			this.stop()
		}
	}
	else{		
		console.log('---------------')
		console.log('Abriendo porton')		
		console.log('---------------')
		this.enProceso = 'abriendo';	
		this.EncenderLuzRoja()
		luces.EncenderTodasLasLuces( (callback) => { console.log(`*** ${callback} ***`)})
		this.abriendo.writeSync(0);
		this.portonAbierto.watch( (err,value) =>{
			if (err) {throw err;}
			console.log('--Porton Abierto--')
			this.abriendo.writeSync(1);
			this.portonAbierto.unwatch();
			this.ApagarLuzRoja();			
			console.log(`Tiempo de espera ${this.tiempoDeEsperaApertura / 1000} segundos....`)		

			this.EncenderLuzVerde();
			this.enProceso = 'esperando';	
			this.timeoutApagarLuzVerde = setTimeout( () => this.ApagarLuzVerde(), `${this.tiempoDeEsperaApertura - 100}` );
			this.timeoutBajarPorton = setTimeout( () => this.CerrarPorton(), `${this.tiempoDeEsperaApertura}`);
		})
	}
}

Porton.prototype.CerrarPorton = function(){
	if(this.portonCerrado.readSync() || (this.abriendo.readSync() ^ 1)|| (this.cerrando.readSync() ^ 1 ) ){		
		if(this.portonCerrado.readSync()){		
			console.log('--Ya está cerrado--')				
		}
		else if( this.cerrando.readSync() ^ 1 ){
			console.log('--Ya está cerrando--')
			this.stop()				
		}
		else{
			console.log('--Está cerrado... Detengo la marcha--')								
			this.stop()
		}
	}
	else{
		console.log('---------------')
		console.log('Cerrando porton')
		console.log('---------------')
		this.enProceso = 'cerrando';	
		this.EncenderLuzRoja()
		
		//Verifico con fotocelula este proceso
		this.fotoCelula.watch( (err,value) =>{
			if (err) {throw err;}			
			console.log('-------------------')
			console.log('FOTOCELULA ACTIVADA')			
			console.log('-------------------')
			if(this.cerrando.readSync() ^ 1 ){				
				console.log('-------PARO TODO!!! ESTA BAJANDO--------')				
				this.ApagarLuzRoja()
				this.stop();			
			}
			else{				
				console.log('--EN ESTA COND. NO PASA NADA--')				
			}
		})

		this.cerrando.writeSync(0);
		this.portonCerrado.watch( (err,value) =>{
			if (err) {throw err;}			
			
			if(this.cerrando.readSync() ^ 1 ){
				console.log('--------------')
				console.log('Porton Cerrado')
				console.log('--------------')
				this.enProceso = 'cerrado';
				this.ApagarLuzRoja();
				this.cerrando.writeSync(1);
				this.portonCerrado.unwatch();		
				this.EncenderLuzVerde();
				this.timeoutPortonCerrado = setTimeout( () => this.stop(), `${this.tiempoDeEsperaCierre}`);				
			}
			else{
				console.log('--No toquen el switch de cerrando!!!--')
			}
		})
	}
}


Porton.prototype.CambiarEstadoLuzRoja = function() {  //Porton.prototype.CambiarEstadoLuzRoja =function () { 
  	var value = this.luzRoja.readSync()
  	this.luzRoja.writeSync(value ^ 1)  	   
}

Porton.prototype.EncenderLuzRoja =function () {   	
  	this.intervaloParpadeo = setInterval( () => this.CambiarEstadoLuzRoja(), `${this.tiempoDeBlink}`)
  	this.luzRoja.writeSync(1)  	   
}

Porton.prototype.ApagarLuzRoja =function () {   	
  	clearInterval(this.intervaloParpadeo);
  	this.luzRoja.writeSync(0)  	   
}

Porton.prototype.GetEstadoLuzRoja =function () {   	
  	return this.luzRoja.readSync()  	   
}

Porton.prototype.CambiarEstadoLuzVerde =function () { 
  	var value = this.luzVerde.readSync()
  	this.luzVerde.writeSync(value ^ 1)  	   
}

Porton.prototype.EncenderLuzVerde =function () {   	
  	this.luzVerde.writeSync(1)  	   
}

Porton.prototype.ApagarLuzVerde =function () {   	
  	this.luzVerde.writeSync(0)  	   
}

Porton.prototype.GetEstadoLuzVerde =function () {   	
  	return this.luzVerde.readSync()  	   
}

Porton.prototype.stop = function(){
	this.abriendo.writeSync(1);
	this.cerrando.writeSync(1);
	this.ApagarLuzVerde();
	this.ApagarLuzRoja();	
	clearTimeout(this.timeoutPortonCerrado);	
	clearTimeout(this.timeoutBajarPorton);	
	clearTimeout(this.timeoutApagarLuzVerde);	
	clearInterval(this.intervaloParpadeo);			
	this.portonCerrado.unwatch();	
	this.portonAbierto.unwatch();	
	this.fotoCelula.unwatch();	
	this.enProceso = 'detenido';	
}

Porton.prototype.banner = function(texto){
	try{		
		var largo = texto.length
		var raya = ''
		for(i=1;i<=largo;i++){raya += '-'}
		console.log('')
		console.log(raya)
		console.log(texto)
		console.log(raya)
		console.log('')
	}catch(err){
		console.log('--ERROR: texto no suministrado--')
	}
}


// export the class
module.exports = new Porton();

//Para test Copy Paste
//var p = new Porton();
//p.AccionarPorton()