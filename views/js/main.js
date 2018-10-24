//////////
// PLUGIN PARA QUE LAS COSAS APAREZCAN EN SCROLL

wow = new WOW({
	boxClass:		'wow',
	animateClass:	'animated',
	offset:			30,
	mobile:			false,
	live:			true,
})

wow.init();


//////////
// PLUGIN PARA ANIMAR ÍCONOS

var els= document.getElementsByClassName("icon-animate");
for (var i = els.length - 1; i >= 0; i--) {
	new Vivus(els[i], {type: 'delayed', duration: 100});
}


//////////
// MENÚ DESPLEGABLE RESPONSIVE

$('.open-nav').click(function() {
	$(this).toggleClass('close-nav');
	$('.overlay-nav').fadeIn(400);
	$('body').toggleClass('main-nav-open overflow-hidden');
});

$('.open-sidenav').click(function() {
	$(this).toggleClass('close-nav');
	$('.sidenav').slideToggle(300);
});

$('.sidenav a').click(function() {
	if ($(window).width() < 1024) {
		$('.sidenav').slideUp(300);
	}
});

$('.main-nav li a:not(.dropdown), .admin-nav li a:not(.dropdown)').click(function() {
	$('.overlay-nav').fadeOut(400);
	$('body').removeClass('main-nav-open overflow-hidden');
	$('.burger').removeClass('close-nav');
});

$(document).click(function() { 
	if(!$(event.target).closest('.main-nav, .admin-nav, .burger').length) {
		$('.overlay-nav').fadeOut(400);
		$('body').removeClass('main-nav-open overflow-hidden');
		$('.burger').removeClass('close-nav');
	}
});


//////////
// DESPLIEGA Y CIERRA NOTIFICACIONES

$('.noti-top a').click(function() {
	$(this).toggleClass('noti-top-active');
	$('.notificaciones').toggleClass('notificaciones-abierto');
	$('.header-home').addClass('header-fakescroll2');
});

$(document).click(function() { 
	if(!$(event.target).closest('.notificaciones, .noti-top').length) {
		$('.noti-top a').removeClass('noti-top-active');
		$('.notificaciones').removeClass('notificaciones-abierto');
		$('.header-home').removeClass('header-fakescroll2');
	}
});

//////////
// DESPLIEGA Y CIERRA DROPDOWN DE NAVEGACIÓN Y DE USUARIO

$('.dropdown').click(function() {
	$(this).toggleClass('dropdown-abierto').next('ul').slideToggle(250);
	$(this).parent('.user-top').toggleClass('user-top-abierto');
});

$('.header-home .dropdown').click(function() {
	$('.header-home').addClass('header-fakescroll');
});

$(document).click(function() { 
	if(!$(event.target).closest('.user-top').length) {
		$('.user-top').removeClass('user-top-abierto').find('.dropdown').removeClass('dropdown-abierto');
		$('.user-top .dropdown + ul').slideUp(250);
		$('.header-home').removeClass('header-fakescroll');
	}
});

$(document).click(function() { 
	if(!$(event.target).closest('nav .dropdown').length) {
		$('nav .dropdown').removeClass('dropdown-abierto');
		$('nav .dropdown + ul').slideUp(250);
	}
});

$(document).click(function() { 
	if(!$(event.target).closest('.ordenar-mostrar').length) {
		$('.ordenar-mostrar').removeClass('dropdown-abierto');
		$('.ordenar-mostrar + ul').slideUp(250);
	}
});


//////////
// FUNCIÓN GENÉRICA DE SLIDEDOWN

$('[data-slidetoggle]').click(function() {
	var slide = $(this).attr('data-slidetoggle');
	$('.slided:not(#' + slide + ')').slideUp(500).removeClass('slided');
	$('#' + slide).slideToggle(500, function() {
		$(this).addClass('slided');
		var scrollTop = $(this).offset().top;
		var headHeight = $('header').height();
		var scrollTo = scrollTop + headHeight + 20;
		$('html, body').animate({scrollTop: scrollTo}, 700);
	});
});

$('[data-slidebasic]').click(function() {
	var slide = $(this).attr('data-slidebasic');
	$('#' + slide).slideToggle(500);
});

$('[data-slideup]').click(function() {
	var slide = $(this).attr('data-slideup');
	$('#' + slide).removeClass('slided').slideUp(500);
});

$('[data-slideupall]').click(function() {
	$('.panel-desplegable').removeClass('slided').slideUp(500);
});


//////////
// INIT TOOLTIPS

$('body').tooltip({
    selector: '.has-tooltip'
});

//////////
// EDITAR INFORMACIÓN EN PERFIL

$('.change-data').click(function() {
	$(this).parent('.info-editable').hide().next('.info-editar').show().find('input').focus().select();
});

$('.change-accept').click(function() {
	var val = $(this).parent('.info-editar').find('input').val();
	$(this).parent('.info-editar').prev('.info-editable').find('.info-actual').html(val);
	$(this).parent('.info-editar').hide().prev('.info-editable').show();
});

$('.change-cancel').click(function() {
	var val = $(this).parent('.info-editar').prev('.info-editable').find('.info-actual').html();
	$(this).parent('.info-editar').hide().prev('.info-editable').show();
	$(this).parent('.info-editar').find('input').val(val);
});


// CAMBIAR IMAGEN DE PERFIL

$('.change-pic').click(function() {
	$(this).prev().click();
});

$('#profile-pic').change(function() {
	oldsrc = $('.user-profile-pic .user-pic').css('background-image');
	src = window.URL.createObjectURL(this.files[0]);

	$('.user-profile-pic .user-pic').css('background-image', 'url(' + src + ')');
	$('.user-profile-pic').addClass('user-pic-editing');
	$(this).parent().find('.change-pic').fadeOut(500);
	$(this).parent().find('.change-accept, .change-cancel').fadeIn(500);

	$('.change-cancel').click(function() {
		$('.user-profile-pic .user-pic').css('background-image', oldsrc);
		$('.user-profile-pic').removeClass('user-pic-editing');
		$(this).parent().find('.change-pic').fadeIn(500);
		$(this).parent().find('.change-accept, .change-cancel').fadeOut(500);
	});

	$('.change-accept').click(function() {
		$('.user-profile-pic').removeClass('user-pic-editing');
		$(this).parent().find('.change-pic').fadeIn(500);
		$(this).parent().find('.change-accept, .change-cancel').fadeOut(500);
	});
});


//////////
// DESPLIEGA BÚSQUEDA EN RESPONSIVE

$('.open-search').click(function() {
	$(this).toggleClass('open-search-active').find('i').toggleClass('icon-search icon-cross');
	$('.panel-buscar').slideToggle(300);
});


//////////
// FUNCIONES DE APERTURA Y CIERRE DE MODALS

$('[data-modal]').click(function() {
	var modal = $(this).attr('data-modal');
	$('.modal#' + modal).fadeIn(300).addClass('modal-abierto').find('.videoModal').get(0).play();
	$('body').addClass('overflow-hidden');
	if ($('.modal#' + modal).attr('data-duracion')) {
		var duracion = $('.modal#' + modal).attr('data-duracion');
		setTimeout(function() {
			$('.modal#' + modal).fadeOut(300).removeClass('modal-abierto')
		}, duracion);
	}
});

$('[data-dismiss]').click(function() {
	var modal = $(this).attr('data-dismiss');
	$('body').removeClass('overflow-hidden');
	$('.modal#' + modal).fadeOut(300).removeClass('modal-abierto').find('.videoModal').get(0).pause();
});


//////////
// FUNCION DE TABS

$('[data-tab]').click(function() {
	var showTab = $(this).attr('data-tab');
	$('#' + showTab).siblings('.tab-content').slideUp(500);
	$('#' + showTab).slideDown(500);
	$(this).parent().siblings().removeClass('current');
	$(this).parent().addClass('current');
});


//////////
// ACTIVO PLUGIN SELECT2

$('.select2-basic').select2();

$('.select2-tags').select2(
	{
		tags: true
	}
);


//////////
// TOGGLES

$('.toggle').click(function() {
	var on = $(this).attr('data-on');
	var off = $(this).attr('data-off');
	if ($(this).hasClass('toggle-active')) {
		$(this).prop('title', off).tooltip('fixTitle').tooltip('show');;
	} else {
		$(this).prop('title', on).tooltip('fixTitle').tooltip('show');;
	}
	$(this).toggleClass('toggle-active');
});


//////////
// DATE PICKER

$(document).ready(function () {
	$('.datepicker').pickadate({
		firstDay: 0,
		container: 'body',
		format: 'd-m-yyyy',
		max: true,
		minDate: '1918',
		selectYears: true,
		selectMonths: true,
		selectYears: 100
	});
});


//////////
// AGREGO CLASE AL HEADER CUANDO SCROLLEO

$(window).scroll(function() {
	var windscroll = $(window).scrollTop();
	if (windscroll >= 20) {
		$('header').addClass('header-scroll');
	} else {
		$('header').removeClass('header-scroll');
	}
}).scroll();


//////////
// AGREGO CLASE AL HEADER CUANDO SCROLLEO

$('[data-enable]').click(function() {
	var target = $(this).attr('data-enable');
	$('#' + target).toggleClass('disabled');
});


//////////
// MENÚ DESPLEGABLE PERFIL

$('.show-profile-nav').click(function() {
	$(this).find('i').toggleClass('icon-chevron-up');
	$('.profile-nav ul').toggleClass('profile-nav-open');
})


//////////
// IGUALA ALTURAS DE ELEMENTOS DESPARJEOS

function fixHeight(elem){
	var maxHeight = 0;
	$(elem).css('height','auto');
	$(elem).each(function(){
		if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
	});
	$(elem).height(maxHeight);
}

$(window).resize(function () {
	fixHeight('.noticia');
});

$(document).ready(function(e) {
	fixHeight('.noticia');
});


function toggle(element) {
    $(element).toggleClass('toggle-active');
}