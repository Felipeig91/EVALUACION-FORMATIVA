// BOTON DE SCROLL-TO-TOP MEJORADO CON JQUERY
// Propósito: Mostrar un botón flotante cuando el usuario hace scroll en index.html
// Al hacer click, sube suavemente a la parte superior con animación jQuery

// Ejecutar cuando el DOM esté completamente cargado
$(document).ready(function() {
  // Seleccionar el botón de scroll-to-top con jQuery
  const $botón = $("#btn-ir-arriba");
  
  // EVENTO 1: Mostrar/ocultar botón al hacer scroll
  // Se ejecuta continuamente mientras el usuario hace scroll
  $(window).on('scroll', function() {
    // Si el usuario ha scrolleado más de 20px hacia abajo, mostrar el botón
    if ($(window).scrollTop() > 20) {
      // fadeIn: mostrar con efecto de aparición suave (duración 200ms)
      $botón.fadeIn(200);
    } else {
      // Si está en la parte superior, ocultar el botón
      // fadeOut: desaparecer con efecto suave (duración 200ms)
      $botón.fadeOut(200);
    }
  });
  
  // EVENTO 2: Volver al top suavemente al hacer clic en el botón
  $botón.on('click', function(e) {
    e.preventDefault();  // Prevenir comportamiento por defecto del link
    
    // Animar el scroll hacia la parte superior
    // scrollTop: 0 lleva el scroll al top
    // 800 ms es la duración de la animación suave
    $('html, body').animate({scrollTop: 0}, 800);
  });
});


