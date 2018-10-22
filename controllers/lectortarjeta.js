'use strict'

const Acceso = require('../models/acceso.js')
const rfid=require('node-rfid');


function LeerTarjeta(req,res){
    var timeoutLectura = 5000; //5 segundos
    var timeIntervaloLectura = 1000; //cada 1 segundo

    var to = setTimeout( () => {
    	clearInterval(intervalo)
    	return res.status(408).send({message: 'timeout',Id: null,Usuario: null})
    }, 5000 );

    var intervalo = setInterval( () => {          
	        rfid.read(function(err,lectura){
		       if(err) {
		       	console.log('error');
		       	clearInterval(intervalo);
		       	clearTimeout(to)
		       	return res.status(500).send({message: 'error',Id: null,Usuario: null})
		       }	       
		       else{
		        console.log(lectura);
		        clearInterval(intervalo);
		        clearTimeout(to)
		         
		        Acceso.findOneByIdPublico(lectura, function (err,acc){
		         	if(err){
		         		return res.status(500).send({message: 'error',Id: lectura,Usuario: 'error'})           		
		         	} 
		         	else if(!acc){	         		
		         		return res.status(404).send({message: 'ok',Id: lectura,Usuario: 'No asociado'})           		
		         	}
		         	else {
		         		return res.status(201).send({message: 'ok',Id: lectura,Usuario: acc.usuario})   
		         	}
		         })
		       }
			});	
     	}, 
     	1000 
    );
}


module.exports = {
	LeerTarjeta,

}