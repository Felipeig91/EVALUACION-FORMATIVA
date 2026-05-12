// CARGA DINAMICA DE NAVBAR
// Propósito: Cargar automáticamente el navbar en todas las páginas
// Detecta la ubicación actual y ajusta las rutas de links automáticamente

// Cargar navbar automáticamente con jQuery
$(document).ready(function() {
  // DETECTAR UBICACIÓN ACTUAL
  // Revisar si la página está en /html/, /pokemon/ o en el root
  const isInHtmlFolder = window.location.pathname.includes('/html/');
  const isInPokemonFolder = window.location.pathname.includes('/pokemon/');
  
  // Variables para almacenar rutas según ubicación
  let navbarPath;
  let links;
  
  if (isInHtmlFolder) {
    // CASO 1: Estamos en /html/contacto.html, /html/proyectos.html, etc.
    // El navbar está en el mismo nivel: html/navbar.html
    navbarPath = 'navbar.html';
    links = {
      rootIndex: '../index.html',  // Subir un nivel (..) para llegar a index.html
      inicio: '../index.html',
      quienes: 'quienes-somos.html',  // Mismo nivel
      proyectos: 'proyectos.html',
      categorias: 'categorias.html',
      contacto: 'contacto.html'
    };
  } else if (isInPokemonFolder) {
    // CASO 2: Estamos en /pokemon/pokemon.html
    // El navbar está en /html/navbar.html (suemos dos niveles)
    navbarPath = '../html/navbar.html';
    links = {
      rootIndex: '../index.html',  // Subir dos niveles para llegar a root
      inicio: '../index.html',
      quienes: '../html/quienes-somos.html',  // Entrar a carpeta html
      proyectos: '../html/proyectos.html',
      categorias: '../html/categorias.html',
      contacto: '../html/contacto.html'
    };
  } else {
    // CASO 3: Estamos en el root (index.html)
    // El navbar está en /html/navbar.html
    navbarPath = 'html/navbar.html';
    links = {
      rootIndex: 'index.html',
      inicio: 'index.html',
      quienes: 'html/quienes-somos.html',  // Entrar a carpeta html
      proyectos: 'html/proyectos.html',
      categorias: 'html/categorias.html',
      contacto: 'html/contacto.html'
    };
  }
  
  // CARGAR NAVBAR DINAMICAMENTE
  // Buscar contenedor del navbar en el HTML
  const $navbarContainer = $('#navbar-container');
  
  if ($navbarContainer.length) {
    // Si existe el contenedor, cargar el archivo HTML del navbar
    // $.load(url, callback) carga contenido externo e lo inyecta en el selector
    $navbarContainer.load(navbarPath, function(response, status, xhr) {
      if (status === 'success') {
        // El archivo se cargó correctamente
        // Obtener el HTML del navbar cargado
        let html = $navbarContainer.html();
        
        // REEMPLAZAR PLACEHOLDERS CON LINKS REALES
        // El navbar.html contiene placeholders como ROOT_INDEX, CONTACTO_LINK, etc.
        // Los reemplazamos con los links correctos según la ubicación actual
        html = html.replace(/ROOT_INDEX/g, links.rootIndex);
        html = html.replace(/INICIO_LINK/g, links.inicio);
        html = html.replace(/QUIENES_LINK/g, links.quienes);
        html = html.replace(/PROYECTOS_LINK/g, links.proyectos);
        html = html.replace(/CATEGORIAS_LINK/g, links.categorias);
        html = html.replace(/CONTACTO_LINK/g, links.contacto);
        
        // Inyectar el HTML modificado de vuelta en el DOM
        $navbarContainer.html(html);
      } else {
        // Si hay error al cargar, mostrar en consola del navegador
        console.error('Error cargando navbar:', xhr.status, xhr.statusText);
      }
    });
  }
});
