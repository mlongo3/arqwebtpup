'use strict'

const Gpio = require('onoff').Gpio;
const porton = require('./porton.js')
const Record = require('../controllers/registro.js')

function Parada() {
    this.boton = new Gpio(6, 'in', 'rising', {debounceTimeout: 100});
    this.tiempoDeintervalo = 500; //Seguro hay que bajarlo   
    this.intervaloRevision = setInterval( () => {
        if(this.boton.readSync()){
            var estadoPorton = porton.GetEstado()
            porton.stop();                        
            if(estadoPorton != 'detenido'){
                console.log('*********************************')
                console.log('*********************************')
                console.log('** ¡¡¡¡PARADA DE EMERGENCIA!!! **')
                console.log('*********************************')
                console.log('*********************************')
                Record.newRegistro(null,null,'/paradaemergencia','post',true,'critico','Parada de Emergencia',200)
            }
            else{
                //console.log('no pasa nada, toca el boton todo lo que quieras.')
            }
            
        }
        else{

        }
    }, this.tiempoDeintervalo)
}

Parada.prototype.GetEstado = function(){	
	return this.boton.readSync();
}

module.exports = new Parada()
