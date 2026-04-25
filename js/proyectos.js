// Filtrado de proyectos por categoría
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.btn-filter');
  const proyectoCards = document.querySelectorAll('.proyecto-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');

      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Añadir clase active al botón clickeado
      this.classList.add('active');

      // Filtrar proyectos
      proyectoCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'todos' || cardCategory === filterValue) {
          // Mostrar con animación
          card.classList.remove('hidden');
          card.classList.add('show');
          setTimeout(() => {
            card.style.display = 'block';
          }, 0);
        } else {
          // Ocultar
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });
});
