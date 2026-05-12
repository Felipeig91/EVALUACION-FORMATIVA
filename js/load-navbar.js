// Cargar navbar automáticamente con jQuery
$(document).ready(function() {
  // Detectar si estamos en una página dentro de html/ o en el root
  const isInHtmlFolder = window.location.pathname.includes('/html/');
  const navbarPath = isInHtmlFolder ? 'navbar.html' : 'html/navbar.html';
  
  // Definir los links según la ubicación
  const links = isInHtmlFolder ? {
    rootIndex: '../index.html',
    inicio: '../index.html',
    quienes: 'quienes-somos.html',
    proyectos: 'proyectos.html',
    categorias: 'categorias.html',
    contacto: 'contacto.html'
  } : {
    rootIndex: 'index.html',
    inicio: 'index.html',
    quienes: 'html/quienes-somos.html',
    proyectos: 'html/proyectos.html',
    categorias: 'html/categorias.html',
    contacto: 'html/contacto.html'
  };
  
  // Buscar contenedor del navbar
  const $navbarContainer = $('#navbar-container');
  
  if ($navbarContainer.length) {
    // Usar jQuery para cargar el navbar
    $navbarContainer.load(navbarPath, function(response, status, xhr) {
      if (status === 'success') {
        // Reemplazar placeholders con los links correctos
        let html = $navbarContainer.html();
        html = html.replace(/ROOT_INDEX/g, links.rootIndex);
        html = html.replace(/INICIO_LINK/g, links.inicio);
        html = html.replace(/QUIENES_LINK/g, links.quienes);
        html = html.replace(/PROYECTOS_LINK/g, links.proyectos);
        html = html.replace(/CATEGORIAS_LINK/g, links.categorias);
        html = html.replace(/CONTACTO_LINK/g, links.contacto);
        $navbarContainer.html(html);
      } else {
        console.error('Error cargando navbar:', xhr.status, xhr.statusText);
      }
    });
  }
});
