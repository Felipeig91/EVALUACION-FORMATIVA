// CARGA DINAMICA DE FOOTER
// Propósito: Cargar automáticamente el footer en todas las páginas
// Detecta ubicación y ajusta rutas automáticamente

// Cargar footer automáticamente con jQuery
$(document).ready(function() {
  // Detectar ubicación actual
  // Si estamos en /html/contacto.html, el footer está en /html/footer.html
  // Si estamos en index.html (root), el footer está en /html/footer.html
  const footerPath = window.location.pathname.includes('/html/') 
    ? 'footer.html'  // Mismo nivel si estamos en /html/
    : 'html/footer.html';  // Entrar a carpeta si estamos en root
  
  // Buscar contenedor del footer
  const $footerContainer = $('#footer-container');
  
  if ($footerContainer.length) {
    // Cargar archivo HTML del footer e inyectarlo en el DOM
    // $.load() es más simple que fetch() para cargar HTML
    $footerContainer.load(footerPath, function(response, status, xhr) {
      if (status === 'error') {
        // Si hay error al cargar, mostrar en consola
        console.error('Error cargando footer:', xhr.status, xhr.statusText);
      }
    });
  }
});
