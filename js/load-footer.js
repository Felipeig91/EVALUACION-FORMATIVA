// Cargar footer automáticamente
document.addEventListener('DOMContentLoaded', function() {
  // Detectar si estamos en una página dentro de html/ o en el root
  const footerPath = window.location.pathname.includes('/html/') 
    ? 'footer.html' 
    : 'html/footer.html';
  
  // Buscar contenedor del footer
  const footerContainer = document.getElementById('footer-container');
  
  if (footerContainer) {
    fetch(footerPath)
      .then(response => response.text())
      .then(html => {
        footerContainer.innerHTML = html;
      })
      .catch(error => console.error('Error cargando footer:', error));
  }
});
