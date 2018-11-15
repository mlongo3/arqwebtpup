'use strict'

const Acceso = require('../models/acceso.js')
const rfid=require('node-rfid');


function LeerTarjeta(req,res){
    var timeoutLectura = 5000; //5 segundos
    var timeIntervaloLectura = 1500; //cada 1 segundo 

    var to = setTimeout( () => {
    	clearInterval(intervalo)
    	return res.status(408).send({message: 'timeout',Id: null,Usuario: null})
    }, timeoutLectura );

    var intervalo = setInterval( () => {          
	        rfid.read(
	        	//funtion de callback
	        	function(err,lectura){
			       if(err) {
				       	console.log('error en lecutra');
				       	clearInterval(intervalo); //paro de intentar leer
				       	clearTimeout(to) //no quiero que responda por timeout
				       	return res.status(500).send({message: 'error',Id: null,Usuario: null}) //respondo.
			       }	       
			       else{		        
				        console.log(lectura); //muestro el ID leido
				        clearInterval(intervalo);
				        clearTimeout(to)
			         
				        Acceso.findOneByIdPublico(
				        	lectura, 
				        		function (err,acc){		         	
						         	if(err){		         		
						         		clearInterval(intervalo);
						         		clearTimeout(to)
						         		return res.status(500).send({message: 'error',Id: lectura,Usuario: 'error'})           		
						         	} 
						         	else if(!acc){	    
						         		clearInterval(intervalo);
						         		clearTimeout(to)		         		
						         		return res.status(404).send({message: 'ok',Id: lectura,Usuario: 'No asociado'})           		
						         	}
						         	else {		        
						         		clearInterval(intervalo);
						         		clearTimeout(to) 		
						         		return res.status(201).send({message: 'ok',Id: lectura,Usuario: acc.usuario})   
						         	}
				         		}
				        )
				    }
				}
			);	
     	}, 
     	timeIntervaloLectura 
    );
}


module.exports = {
	LeerTarjeta,

}