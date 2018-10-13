'use strict'
const Gpio = require('onoff').Gpio; 

// Constructor
function Luces() {  	
	this.primarias = new Gpio(12, 'out'); 
	this.secundarias = new Gpio(16, 'out'); 	
	this.timeoutEncendidoPrimarias = '';
	this.timeoutEncendidoSecundarias = '';	
	this.tiempoEncendidasPrimarias = 10000; //10 segundos	
	this.tiempoEncendidasSecundarias = 5000; //5 segundos	- Las secundarias, estarán encendidas la mitad del tiempo que las primarias.	
}

// class methods - si es necesario ponerlo en el Porton.prototype.cambiar....
Luces.prototype.GetEstadoPrimarias = function(callback){	
	return callback(this.primarias.readSync())
}

Luces.prototype.GetEstadoSecundarias = function(callback){	
	return callback(this.secundarias.readSync())
}

Luces.prototype.EncenderPrimarias = function(callback){	
	this.primarias.writeSync(1)
	this.timeoutEncendidoPrimarias = setTimeout( () => this.ApagarPrimarias(
		(cb) => {
			if(cb){ 
				console.log(`${cb}`)
			}
			else{
				console.log('Apagando primarias sin callback recibido de apagar')
			}
		}
	), `${this.tiempoEncendidasPrimarias}`);	
	return callback('Encendiendo luces primarias')
}

Luces.prototype.ApagarPrimarias = function(callback){	
	this.primarias.writeSync(0)
	clearTimeout(this.timeoutEncendidoPrimarias);	
	return callback('Apagando luces primarias')
}

Luces.prototype.EncenderSecundarias = function(callback){	
	this.secundarias.writeSync(1)
	this.timeoutEncendidoSecundarias = setTimeout( () => this.ApagarSecundarias(
		(cb) => {
			if(cb){ 
				console.log(`${cb}`)
			}
			else{
				console.log('Apagando secundarias sin callback recibido de apagar')
			}
		}
	), `${this.tiempoEncendidasSecundarias}`);	
	return callback('Encendiendo luces secundarias')
}

Luces.prototype.ApagarSecundarias = function(callback){	
	this.secundarias.writeSync(0)
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

var l = new Luces()
/*
//Para test
l.EncenderPrimarias( (cb) => {console.log(`${cb}`)})
l.ApagarPrimarias( (cb) => {console.log(`${cb}`)})
l.EncenderSecundarias( (cb) => {console.log(`${cb}`)})
l.ApagarSecundarias( (cb) => {console.log(`${cb}`)})
l.EncenderTodasLasLuces( (cb) => {console.log(`${cb}`)})
l.ApagarTodasLasLuces( (cb) => {console.log(`${cb}`)})
*/