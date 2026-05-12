// FILTRADO DINAMICO DE PROYECTOS
// Propósito: Permitir filtrar proyectos por categoría sin recargar la página
// Las categorías se seleccionan con botones que muestran/ocultan tarjetas dinámicamente

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar todos los botones de filtro y todas las tarjetas de proyecto
  const filterButtons = document.querySelectorAll('.btn-filter');
  const proyectoCards = document.querySelectorAll('.proyecto-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Obtener la categoría a filtrar desde el atributo data-filter
      // Ejemplo: data-filter="musica" filtrará proyectos con data-category="musica"
      const filterValue = this.getAttribute('data-filter');

      // PASO 1: Remover clase "active" de todos los botones
      // Esto deselecciona visualmente todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // PASO 2: Agregar clase "active" al botón que se acaba de clickear
      // Esto lo resalta visualmente
      this.classList.add('active');

      // PASO 3: Filtrar y mostrar/ocultar proyectos
      // Iterar sobre cada tarjeta de proyecto
      proyectoCards.forEach(card => {
        // Obtener la categoría de la tarjeta (ej: "musica", "tecnologia")
        const cardCategory = card.getAttribute('data-category');

        // Si el filtro es "todos" O la categoría coincide, mostrar la tarjeta
        if (filterValue === 'todos' || cardCategory === filterValue) {
          // Remover clase "hidden" y añadir "show" (para animación)
          card.classList.remove('hidden');
          card.classList.add('show');
          
          // Hacer visible la tarjeta después de la transición CSS
          setTimeout(() => {
            card.style.display = 'block';
          }, 0);
        } else {
          // Si no coincide, ocultar la tarjeta
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });
});
