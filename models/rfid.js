'use strict'

const rfid=require('node-rfid');


function RFID(){		
	this.lectura = 'inicial'
	this.intervalo
}


RFID.prototype.leerRFID = function(){     
     
          rfid.read( function(err,resultado){
               if(err){
                    console.log('error');                        
                    throw err
               } 
               else{
                    console.log(resultado)
                    //return resultado
               }         
          })       
}


RFID.prototype.GetUltimo = function(){
	return this.lectura 
}


RFID.prototype.Activar = function(){
	console.log('Lector activado')
	this.intervalo = setInterval( () => {          
          this.leerRFID()
     }, 1000 );	
}

RFID.prototype.Desactivar = function(){
	console.log('Lector desactivado')
	clearInterval(this.intervalo)
}

module.exports = RFID();
