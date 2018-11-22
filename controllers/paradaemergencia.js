'use strict'

const ParadaEmergencia = require('../models/paradaEmergencia.js')
const porton = require('../models/porton.js')

function parada(req,res){
    var estadoPorton = porton.GetEstado()
    porton.stop();                        
    if(estadoPorton != 'detenido'){
        console.log('*********************************')
        console.log('*********************************')
        console.log('** ¡¡¡¡PARADA DE EMERGENCIA!!! **')
        console.log('*********************************')
        console.log('*********************************')        
        Record.newRegistro(req.user,null,req.url,req.method,true,'critico','Parada de Emergencia',202)
        return res.status(202).send({message:'Se detuvo el porton'}) 
    }
    else{
        //console.log('nada nada')
        return res.status(200).send({message:'El porton ya está detenido'})
    }        
}

module.exports = {
    parada,
}