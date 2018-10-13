'use strict'

function CamaraInterna() {  	
	this.nombre = 'camaraInterna'; //camaraExterna camaraInterna
	this.puerto = '/dev/video1'; //   /dev/video0
	this.skip = '2';
	this.brightness = '60%';
	this.contrast = '15%';
	this.gamma = '50%';
	this.resolution = '640x480';
	this.sharpness = '40%';
	this.saturation = '15%';
}

module.exports = new CamaraInterna()

