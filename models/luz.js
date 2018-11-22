'use strict'
const Gpio = require('onoff').Gpio; 

// Constructor
function Luces() {  	
	this.primarias = new Gpio(18, 'out');
	this.primarias.writeSync(1) 
	this.secundarias = new Gpio(23, 'out'); 	
	this.secundarias.writeSync(1)
	this.timeoutEncendidoPrimarias = '';
	this.timeoutEncendidoSecundarias = '';	
	this.tiempoEncendidasPrimarias = 50000; //50 segundos	
	this.tiempoEncendidasSecundarias = 30000; //30 segundos	- Las secundarias, estarán encendidas hasta que empieza a bajar el porton.
}

// class methods - si es necesario ponerlo en el Porton.prototype.cambiar....
Luces.prototype.GetEstadoPrimarias = function(callback){	
	if(this.primarias.readSync() ^ 1){
		return  callback(1)
	}
	else{
		return callback(0)
	}	
}

Luces.prototype.GetEstadoSecundarias = function(callback){	
	//return callback(this.secundarias.readSync() ^ 1)
	if(this.secundarias.readSync() ^ 1){
		return  callback(1)
	}
	else{
		return callback(0)
	}	
}

Luces.prototype.EncenderPrimarias = function(callback){	
	this.primarias.writeSync(0)//cableado al revez
	this.timeoutEncendidoPrimarias = setTimeout( () => this.ApagarPrimarias(
		(cb) => {
			if(cb){ 
				console.log(`*** ${cb} ***`)
			}
			else{
				console.log('Apagando primarias sin callback recibido de apagar')
			}
		}
	), `${this.tiempoEncendidasPrimarias}`);	
	return callback('Encendiendo luces primarias')
}

Luces.prototype.ApagarPrimarias = function(callback){	
	this.primarias.writeSync(1)//cableado al revez
	clearTimeout(this.timeoutEncendidoPrimarias);	
	return callback('Apagando luces primarias')
}

Luces.prototype.EncenderSecundarias = function(callback){	
	this.secundarias.writeSync(0) //cableado al revez
	this.timeoutEncendidoSecundarias = setTimeout( () => this.ApagarSecundarias(
		(cb) => {
			if(cb){ 
				console.log(`*** ${cb} ***`)
			}
			else{
				console.log('Apagando secundarias sin callback recibido de apagar')
			}
		}
	), `${this.tiempoEncendidasSecundarias}`);	
	return callback('Encendiendo luces secundarias')
}

Luces.prototype.ApagarSecundarias = function(callback){	
	this.secundarias.writeSync(1) //cableado al revez
	clearTimeout(this.timeoutEncendidoSecundarias);	
	return callback('Apagando luces secundarias')
}

Luces.prototype.EncenderTodasLasLuces = function(callback){	
	var resultados = 'resultado vacio'

	this.EncenderPrimarias( (cb1) => {resultados = `${cb1}`})
	resultados += ' y '
	this.EncenderSecundarias((cb2) => {resultados += `${cb2}`})	
	return callback(`${resultados}`)
}

Luces.prototype.ApagarTodasLasLuces = function(callback){	
	var resultados = 'resultado vacio'
	this.ApagarPrimarias((cb1) => {resultados = `${cb1}`})
	resultados += ' y '
	this.ApagarSecundarias((cb2) => {resultados += `${cb2}`})		
	return callback(`${resultados}`)
}

module.exports = new Luces();

/*
//Para test
l.EncenderPrimarias( (cb) => {console.log(`${cb}`)})
l.ApagarPrimarias( (cb) => {console.log(`${cb}`)})
l.EncenderSecundarias( (cb) => {console.log(`${cb}`)})
l.ApagarSecundarias( (cb) => {console.log(`${cb}`)})
l.EncenderTodasLasLuces( (cb) => {console.log(`${cb}`)})
l.ApagarTodasLasLuces( (cb) => {console.log(`${cb}`)})
*/