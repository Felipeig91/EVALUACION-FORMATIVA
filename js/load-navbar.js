// Cargar navbar automáticamente
document.addEventListener('DOMContentLoaded', function() {
  // Detectar si estamos en una página dentro de html/ o en el root
  const isInHtmlFolder = window.location.pathname.includes('/html/');
  const navbarPath = isInHtmlFolder ? 'navbar.html' : 'html/navbar.html';
  
  // Definir los links según la ubicación
  const links = isInHtmlFolder ? {
    rootIndex: '../index.html',
    inicio: '../index.html',
    quienes: 'quienes-somos.html',
    proyectos: 'proyectos.html',
    categorias: 'musica.html',
    contacto: 'contacto.html'
  } : {
    rootIndex: 'index.html',
    inicio: 'index.html',
    quienes: 'html/quienes-somos.html',
    proyectos: 'html/proyectos.html',
    categorias: 'html/musica.html',
    contacto: 'html/contacto.html'
  };
  
  // Buscar contenedor del navbar
  const navbarContainer = document.getElementById('navbar-container');
  
  if (navbarContainer) {
    fetch(navbarPath)
      .then(response => response.text())
      .then(html => {
        // Reemplazar placeholders con los links correctos
        html = html.replace(/ROOT_INDEX/g, links.rootIndex);
        html = html.replace(/INICIO_LINK/g, links.inicio);
        html = html.replace(/QUIENES_LINK/g, links.quienes);
        html = html.replace(/PROYECTOS_LINK/g, links.proyectos);
        html = html.replace(/CATEGORIAS_LINK/g, links.categorias);
        html = html.replace(/CONTACTO_LINK/g, links.contacto);
        
        navbarContainer.innerHTML = html;
      })
      .catch(error => console.error('Error cargando navbar:', error));
  }
});
