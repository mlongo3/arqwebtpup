'use strict'

const Gpio = require('onoff').Gpio; 
const camara = require('../controllers/camara.js')
const porton = require('../controllers/porton.js')
const moment = require('moment');

// Constructor
function Movimiento() {  	
	//cambiar por definitiva
	this.sensorMovimiento = new Gpio(17, 'in', 'rising', {debounceTimeout: 2000}); //2 segundos estable
	this.activo = true;
	this.ultimaFotoCapturada = moment().add(-50,'seconds')
	this.tiempoEntreFotos = 50 //segundos -- El sensor, al detectar un movimiento, mantiene un 1 logico por 31 segundos.
	this.tiempoDesdeUltimaFoto;

	this.monitoreo = function(){
		//console.log('adentro de monitoreo')
		if(this.sensorMovimiento.readSync()){
			console.log('--Movimiento Detectado!!!')			
			this.ahora = moment()
			
			if (this.activo && (porton.verEstado() == 'detenido' || porton.verEstado() == 'cerrado'  )){
				
				//Cuando fue la ultima foto que saque?
				this.tiempoDesdeUltimaFoto = Math.round( ((this.ahora - this.ultimaFotoCapturada)/1000 )*100 )/100  //lo paso a segundos.

				//Muestro en pantalla la cuenta regresiva
				console.log(`--Ultima foto hace ${this.tiempoDesdeUltimaFoto}. Faltan ${ Math.round( (this.tiempoEntreFotos - this.tiempoDesdeUltimaFoto)*100 )/100 }  segundos`)

				if( this.tiempoDesdeUltimaFoto >= this.tiempoEntreFotos  ){					
					console.log('--Sacando fotos')					
					try{
						camara.capturar('movimiento')		
						this.ultimaFotoCapturada = this.ahora 
					}
					catch(err){
						console.log('no se pudo capturar foto')	
						console.log(err)
						this.ultimaFotoCapturada = this.ahora  
					}										
				}				
			}	
			else{
				this.ultimaFotoCapturada = this.ahora  //actualizo porque quiero el tiempo muerto luego de que salió de un estado activo.
			}
			
		}
		else{
			//console.log('ya no')
			//console.log(this.ultimaFotoCapturada)
		}		
	}
	this.intervaloRevision = setInterval( () => this.monitoreo(), 5000) //cada 5 segundos miro
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

