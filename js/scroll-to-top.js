// Botón para subir al top de la página
document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (!scrollToTopBtn) return;
  
  // Mostrar/ocultar botón al hacer scroll
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  
  // Hacer scroll suave hacia arriba al hacer click
  scrollToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
