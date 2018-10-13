'use strict'

function CamaraExterna() {  	
	this.nombre = 'camaraExterna'; //camaraExterna camaraInterna
	this.puerto = '/dev/video0'; //   /dev/video0
	this.skip = '2';
	this.brightness = '60%';
	this.contrast = '15%';
	this.gamma = '50%';
	this.resolution = '1280x720';
	this.sharpness = '40%';
	this.saturation = '15%';
}

module.exports = new CamaraExterna()



//fswebcam -d /dev/video0  -S 2 -s brightness=60% -s Contrast=15%  -s Gamma=50%  -p YUYV -r 1280x720 --jpeg 80 -s Sharpness=40% -s Saturation=15%   --title "New Zealand - Wellington - Tawa"  $DIR/$filename