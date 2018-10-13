'use strict'

const Gpio = require('onoff').Gpio; 
const camara = require('../controllers/camara.js')
const porton = require('../controllers/porton.js')
const moment = require('moment');

// Constructor
function Movimiento() {  	
	//cambiar por definitiva
	this.fotocelula = new Gpio(21, 'in', 'rising', {debounceTimeout: 2000}); //2 segundos estable
	this.activo = true;
	this.ultimaToma = moment()
	this.tiempoEntreFotos = 30 //segundos

	this.monitoreo = function(){
		//console.log('adentro de monitoreo')
		if(this.fotocelula.readSync()){
			console.log('--Se detecta movimiento')			
			this.now = moment()

			if (this.activo && (porton.verEstado() == 'detenido' || porton.verEstado() == 'cerrado'  )){
				
				var tiempoUltimaFoto = (this.now - this.ultimaToma)/1000 //lo paso a segundos.
				console.log(`--Ultima foto hace ${tiempoUltimaFoto}. Faltan ${ (this.tiempoEntreFotos - tiempoUltimaFoto) }  segundos`)

				if( tiempoUltimaFoto >= this.tiempoEntreFotos  ){					
					console.log('--Sacando fotos')					
					camara.capturar('movimiento')	
					this.ultimaToma = this.now 
				}				
			}	
			else{
				this.ultimaToma = this.now  //actualizo porque quiero el tiempo muerto luego de que salió de un estado activo.
			}

		}

		
	}
	this.intervaloRevision = setInterval( () => this.monitoreo(), 1000) //cada un segundo
}

Movimiento.prototype.Activar = function(){
	console.log('se activo')
	this.activo = true;
	this.intervaloRevision = setInterval( () => this.monitoreo(), 1000)
}

Movimiento.prototype.Desactivar = function(){
	console.log('se Desactivo')
	this.activo = false;
	clearInterval(this.intervaloRevision)
}

Movimiento.prototype.GetEstado = function(){
	return this.activo
}



module.exports = new Movimiento();

