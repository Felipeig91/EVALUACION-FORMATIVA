// Scroll-to-top mejorado con jQuery
$(document).ready(function() {
  const $botón = $("#btn-ir-arriba");
  
  // Mostrar/ocultar botón al hacer scroll
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 20) {
      $botón.fadeIn(200);
    } else {
      $botón.fadeOut(200);
    }
  });
  
  // Volver al top suavemente al hacer clic
  $botón.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 800);
  });
});


