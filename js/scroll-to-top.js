// BOTON PARA SUBIR AL TOP DE LA PÁGINA
// Propósito: Mostrar un botón flotante cuando el usuario hace scroll
// Al hacer click, sube suavemente a la parte superior

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar el botón de scroll-to-top por su ID
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  // Si el botón no existe en la página, salir
  if (!scrollToTopBtn) return;
  
  // EVENTO 1: Mostrar/ocultar botón al hacer scroll
  // Se ejecuta continuamente mientras el usuario hace scroll
  window.addEventListener('scroll', function() {
    // Si el usuario ha scrolleado más de 300px hacia abajo, mostrar el botón
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');  // Agregar clase para mostrar (opacity/visibility)
    } else {
      // Si está en la parte superior, ocultar el botón
      scrollToTopBtn.classList.remove('show');
    }
  });
  
  // EVENTO 2: Hacer scroll suave hacia arriba al hacer click
  scrollToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();  // Prevenir comportamiento por defecto
    
    // Usar scrollTo con comportamiento suave (smooth) para subir al top
    // top: 0 significa llevar el scroll a la parte superior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // Animar el scroll en lugar de saltar instantáneamente
    });
  });
});
