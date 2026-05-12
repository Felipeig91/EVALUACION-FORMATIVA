// Cargar footer automáticamente con jQuery
$(document).ready(function() {
  // Detectar si estamos en una página dentro de html/ o en el root
  const footerPath = window.location.pathname.includes('/html/') 
    ? 'footer.html' 
    : 'html/footer.html';
  
  // Buscar contenedor del footer con jQuery
  const $footerContainer = $('#footer-container');
  
  if ($footerContainer.length) {
    // $.load() es más simple que fetch para cargar HTML
    $footerContainer.load(footerPath, function(response, status, xhr) {
      if (status === 'error') {
        console.error('Error cargando footer:', xhr.status, xhr.statusText);
      }
    });
  }
});
