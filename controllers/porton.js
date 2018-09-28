'use strict'

const recursos = require('../services/recursos.js')

function activarPorton(req,res){
	recursos.porton.AccionarPorton();
	console.log('Activado')	
}

module.exports = {
	activarPorton
}