'use strict'

//const camaraExterna = require('../models/camaraExterna.js')
//const camaraInterna = require('../models/camaraInterna.js')
const NodeWebcam = require( "node-webcam" );
const moment = require('moment');
const config = require('../config.js')
const dir = config.dirFotos


const optsExt = {
    width: 640, //1280
    height: 480, //720
    quality: 50,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: '/dev/video0',
	skip: 2,
    callbackReturn: "location",
    verbose: true,
	bottomBanner: true,
	//saturation: "15%"
};

const optsInt = {
    width: 640, //640
    height: 480, //480
    quality: 50,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: '/dev/video1',
	skip: 2,
    callbackReturn: "location",
    verbose: true,
	bottomBanner: true,
	//saturation: "15%"
};

const WebcamExt = NodeWebcam.create( optsExt );
const WebcamInt = NodeWebcam.create( optsInt );


function capturarFotos(req,res){		
	var fn = moment().format('YYYYMMDD_a_hhmmss')
	var fnext = fn + '_ext'
	var fnint = fn + '_int'	
	var fne = `${config.dirFotos}${fnext}.jpg`
	var fni = `${config.dirFotos}${fnint}.jpg`	
	
	
	//console.log(req.query)
	if(req.query.camara){
		if(req.query.camara == 'int'){
			//http://192.168.3.3:3001/api/camara/capturar?camara=int
			console.log('-----------------------')
			console.log('Capturando foto interna')
			console.log('-----------------------')
			WebcamInt.capture( fni, function( err, cb ) { 		
				if(err){
					console.log('--no pude guardar foto interna--')
					res.status(500).send({fotoInterna:`${err}`,fotoExterna:''})	
				}
				else{						
					//saco la foto interna
					//console.log('saque la foto interna')
					res.status(201).send({fotoInterna:`${fni}`,fotoExterna:''})		
				}						
			})	
		}
		else if(req.query.camara == 'ext'){
			//externa
			console.log('-----------------------')
			console.log('Capturando foto externa')
			console.log('-----------------------')

			WebcamExt.capture( fne, function( err, cb ) { 		
				if(err){
					console.log('--no pude guardar foto externa--')
					res.status(500).send({fotoInterna:'',fotoExterna:`${err}`})	
				}
				else{						
					//saco la foto interna
					//console.log('saque la foto externa')
					res.status(201).send({fotoInterna:'',fotoExterna:`${fne}`})		
				}						
			})			
		}
		else{
			console.log('--Parametros no validos, no capturo nada--')
			res.status(400).send({fotoInterna:'',fotoExterna:''})			
		}
	}
	else{
		//Todas
		console.log('------------------------')
		console.log('Capturando ambas camaras')
		console.log('------------------------')		
		//primero la externa
		WebcamExt.capture( fne, function( err, cb ) { 		
			if(err){
				console.log('--no pude guardar foto externa--')
				//throw err						
				//res.status(200).send({message:`Foto interna ${fni} y foto externa ${fne}`})	
				fne = err
				WebcamInt.capture( fni, function( err, cb ) { 		
					if(err){
						console.log('--no pude guardar foto interna--')
						//throw err						
						fni = err						
						res.status(500).send({fotoInterna:`${fni}`,fotoExterna:`${fne}`})	

					} 
					else{							
						//console.log('saque la foto interna')											
						res.status(500).send({fotoInterna:`${fni}`,fotoExterna:`${fne}`})	
					}					
				})
			}
			else{						
				//saco la foto interna
				//console.log('saque la foto externa')
				WebcamInt.capture( fni, function( err, cb ) { 		
					if(err){
						console.log('--no pude guardar foto interna--')
						//throw err						
						fni = err
						res.status(500).send({fotoInterna:`${fni}`,fotoExterna:`${fne}`})	
					} 
					else{							
						//console.log('saque la foto interna')											
						res.status(201).send({fotoInterna:`${fni}`,fotoExterna:`${fne}`})	
					}					
				})		
			}						
		})	
	}
}

function capturar(motivo){		
	var fn = moment().format('YYYYMMDD_a_hhmmss')
	var fnext = fn + '_ext' + `_${motivo}`	
	var fnint = fn + '_int' + `_${motivo}`	
	var fne = `${config.dirFotos}${fnext}.jpg`
	var fni = `${config.dirFotos}${fnint}.jpg`	
	
	
	//Todas
	console.log('------------------------')
	console.log('Capturando ambas camaras')		
	console.log('------------------------')
	//primero la externa
	WebcamExt.capture( fne, function( err, cb ) { 		
		if(err){
			console.log('--no pude guardar foto externa--')
			fne = err
			WebcamInt.capture( fni, function( err, cb ) { 		
				if(err){
					console.log('--no pude guardar foto interna--')
					fni = err						
					
					//CARGAR REGISTRO
				} 
				else{							
					//console.log('saque la foto interna')											
					//CARGAR REGISTRO 
				}					
			})
		}
		else{						
			//saco la foto interna
			//console.log('saque la foto externa')
			WebcamInt.capture( fni, function( err, cb ) { 		
				if(err){
					console.log('--no pude guardar foto interna--')					
					fni = err
					//CARGAR REGISTRO
				} 
				else{							
					//console.log('saque la foto interna')																//CARGAR REGISTRO
				}					
			})		
		}						
	})	
}

//fswebcam -d /dev/video0  -S 2 -s brightness=60% -s Contrast=15%  -s Gamma=50%  -p YUYV -r 1280x720 --jpeg 80 -s Sharpness=40% -s Saturation=15%   --title "New Zealand - Wellington - Tawa"  $DIR/$filename
module.exports = {
	capturarFotos,
	capturar
}
	