//ESTE NO SIRVE MAS SIRVE EL MODELO.
const Gpio = require('onoff').Gpio; 
const portonCerrado = new Gpio(19, 'in', 'rising', {debounceTimeout: 10}); 
const portonAbierto = new Gpio(21, 'in', 'rising', {debounceTimeout: 10}); 
const fotoCelula = new Gpio(5, 'in', 'rising', { debounceTimeout : 10 }); 
const abriendo = new Gpio(20, 'out'); 
const cerrando = new Gpio(26, 'out'); 
var luzVerde = new Gpio(23, 'out'); 
var luzRoja = new Gpio(24, 'out'); 
var intervaloParpadeo = setInterval( () => cambiarEstadoluzRoja(), 250)
clearInterval(intervaloParpadeo);
var tiempoApagarLuzVerde;
var tiempoPortCerrado;
var tiempoBajarPorton;

console.log('Fotocelula funcionando!!!...')

encenderLuzVerde()

fotoCelula.watch( (err,value) =>{
	if (err) {throw err;}
	console.log('-------------------')
	console.log('FOTOCELULA ACTIVADA')
	console.log('-------------------')
	if(cerrando.readSync()){
		console.log('-------------------------')
		console.log('PARO TODO!!! ESTA BAJANDO')
		console.log('-------------------------')
		/*
		fotoCelula.unwatch();
		portonCerrado.unwatch();
		portonAbierto.unwatch();
		abriendo.writeSync(0);
		cerrando.writeSync(0);
		clearTimeout(tiempoApagarLuzVerde);
		clearTimeout(tiempoBajarPorton);
		clearTimeout(tiempoPortCerrado);
		detenerluzRoja();
		apagarluzVerde();
		*/
		fin();			
	}
	else{
		console.log('--------------------------')
		console.log('EN ESTA COND. NO PASA NADA')
		console.log('--------------------------')
	}
})


//IMPLEMENTAR CON METODOS PARA TENER UNA INSTANCIA SOLA LEVANTADA.


//Si el porton está en el medio. Puede ser corte de luz, o segunda llamada. 
if(!portonCerrado.readSync() && !portonAbierto.readSync()){
	if(abriendo.readSync() === 1 || cerrando.readSync() === 1){
		//Segunda llamada. Paro todo
		console.log('------------------------------')
		console.log('Paro todo, por segunda llamada')
		console.log('------------------------------')
		/*
		abriendo.writeSync(0);
		cerrando.writeSync(0);
		apagarluzVerde();
		detenerluzRoja();
		fotoCelula.unwatch();
		portonAbierto.unwatch();
		portonCerrado.unwatch();
		*/
		fin();
	}
	else{
		//Abriendo el porton por seguridad post corte de luz.
		console.log('--------------------------------')
		console.log('Abriendo el porton por seguridad')
		console.log('--------------------------------')
				
		apagarluzVerde();
		accionarPorton(abriendo,portonAbierto);
		
		portonAbierto.watch( (err,value) =>{
			if (err) {throw err;}	
			console.log('')
			console.log('--------------------------------')
			console.log('Tiempo de espera 5 segundos.....')
			console.log('--------------------------------')
			console.log('')
			encenderLuzVerde()
			tiempoApagarLuzVerde = setTimeout( () => apagarluzVerde(), 4900);
			tiempoBajarPorton = setTimeout( () => accionarPorton(cerrando,portonCerrado), 5000);
			portonAbierto.unwatch();		
		})
		
		portonCerrado.watch( (err,value) =>{
			if (err) {throw err;}			
			
			if(!abriendo.readSync()){
				portonCerrado.unwatch();		
				encenderLuzVerde();
				tiempoPortCerrado = setTimeout( () => fin(), 3000);				
			}
			else{
				console.log('No toquen el switch de cerrando!!!')
			}
		})
	}	
}
//si el porton está cerrado 
else if(portonCerrado.readSync() && !portonAbierto.readSync()){
	console.log('Abriendo el porton...')
	//Pendiente desarrollo
}
//si el porton está abierto 
else if(!portonCerrado.readSync() && portonAbierto.readSync()){
	console.log('Cerrando el porton...')
	//Pendiente desarrollo
}
else{
	console.log('Condicion imposible, arriba y abajo')
	//Pendiente desarrollo
}


///FUNCIONES////

function cambiarEstadoluzRoja() { 
  	var value = luzRoja.readSync()
  	luzRoja.writeSync(value ^ 1)  	   
}

function encenderLuzVerde() { 
  	luzVerde.writeSync(1)
	console.log('luz verde encendida')  	 
}

function detenerluzRoja() { 
  	clearInterval(intervaloParpadeo);  	
	luzRoja.writeSync(0)
  	console.log('luz roja apagada')	
}

function apagarluzVerde() {   
	luzVerde.writeSync(0)
	console.log('luz verde apagada')	
}


function fin() {  
	fotoCelula.unwatch();
	portonCerrado.unwatch();
	portonAbierto.unwatch();
	abriendo.writeSync(0);
	cerrando.writeSync(0);
	clearTimeout(tiempoApagarLuzVerde);
	clearTimeout(tiempoBajarPorton);
	clearTimeout(tiempoPortCerrado);
	detenerluzRoja();
	apagarluzVerde();
  portonAbierto.unexport();
  portonCerrado.unexport();
  abriendo.unexport();
  cerrando.unexport();
  fotoCelula.unexport();
  luzRoja.unexport();
  luzVerde.unexport();
  console.log('-------')
  console.log('TERMINO')
  console.log('-------')
}

function accionarPorton(puerto,corte){
	if(!puerto || !corte) console.log('no hay parametros')
	
	//habilito intervalo, dado que es modo blink a diferencia de la verde.
	intervaloParpadeo = setInterval( () => cambiarEstadoluzRoja(), 250)
	
	console.log('Accionando el porton...')
	puerto.writeSync(1);
	corte.watch( (err,value) =>{
		if (err) {throw err;}
		console.log('----------------')
		console.log('Fin de recorrido')
		console.log('----------------')
		puerto.writeSync(0);						
		corte.unwatch();	
		detenerluzRoja();					
	})	
}

function abrirPorton(resu){
	if(!abriendo || !portonAbierto) console.log('No se puede proceder sin parametros')

	if(portonAbierto.readSync()){
		console.log('Ya está abierto')
		return resu('Ya está abierto')
	}	
	if(abriendo.readSync()) 
		console.log('Ya se está abriendo')
		return resu('Ya se está abriendo')

		console.log('---------------')
		console.log('Abriendo porton')
		console.log('---------------')
	accionarPorton(abriendo,portonAbierto);

	return resu('Abriendo porton')	
}

function cerrarPorton(resu){
	if(!cerrando || !portonCerrado) console.log('No se puede proceder sin parametros')

	if(portonCerrado.readSync())
		console.log('Ya está cerrado')
		return resu('Ya está cerrado')

	if(cerrando.readSync()) 
		console.log('Ya se está cerrando')
		return resu('Ya se está cerrando')

	if(fotoCelula.readSync())
		console.log('Fotocelula activada no se puede cerrar')
		return resu('Fotocelula activada no se puede cerrar')

		console.log('---------------')
		console.log('Cerrando porton')
		console.log('---------------')
	accionarPorton(cerrando,portonCerrado);

	return resu('Abriendo porton')	
}
	


process.on('SIGINT', () => {
  fin();  
  console.log('saliento')
});


//setTimeout(fin, 30000); //corto a los 20 segundos, porque no quiero quedarme
