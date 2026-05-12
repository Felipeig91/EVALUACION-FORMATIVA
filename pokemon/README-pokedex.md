# Pokédex con jQuery y API Pokémon

Un proyecto interactivo que utiliza jQuery para consumir la API de Pokémon y mostrar información detallada de cada Pokémon.

## Características

✨ **Búsqueda de Pokémon** - Busca por nombre o ID
🎨 **Diseño moderno** - Interfaz limpia y atractiva
📊 **Estadísticas detalladas** - Visualización de stats con gráficos
🏷️ **Tipos de Pokémon** - Badges con colores según el tipo
⚡ **Efectos con jQuery** - Animaciones suaves con fade y slide
🔄 **Peticiones AJAX** - Consume datos en tiempo real de la API

## Estructura del Proyecto

```
├── pokemon.html          # Página principal
├── pokemon-style.css     # Estilos
├── pokemon-script.js     # Lógica con jQuery
└── README-pokedex.md    # Esta documentación
```

## Cómo Funciona

### 1. HTML (pokemon.html)

- Input para buscar Pokémon
- Botón de búsqueda
- Contenedores para mostrar los resultados
- Loading y error messages

### 2. jQuery (pokemon-script.js)

**Event Handlers:**

```javascript
$("#searchBtn").click(function () {
  // Buscar Pokémon al hacer clic
});

$("#pokemonInput").keypress(function (e) {
  // Buscar al presionar Enter
});
```

**AJAX Request:**

```javascript
$.ajax({
  url: `${apiUrl}/${pokemonName}`,
  method: "GET",
  success: function (data) {
    displayPokemon(data);
  },
  error: function () {
    showError("Pokémon no encontrado");
  },
});
```

**Manipulación del DOM:**

- `.text()` - Cambiar texto
- `.attr()` - Cambiar atributos
- `.html()` - Insertar HTML
- `.fadeIn()` / `.hide()` - Efectos
- `.slideDown()` - Animaciones

### 3. CSS (pokemon-style.css)

- Gradientes y sombras
- Animaciones con @keyframes
- Badges con colores por tipo
- Barras de estadísticas

## Funcionalidades jQuery Utilizadas

| Función        | Uso                     |
| -------------- | ----------------------- |
| `.click()`     | Manejar clic en botón   |
| `.keypress()`  | Detectar tecla Enter    |
| `.val()`       | Obtener valor del input |
| `.ajax()`      | Petición HTTP GET       |
| `.text()`      | Establecer texto        |
| `.attr()`      | Cambiar atributos HTML  |
| `.html()`      | Insertar HTML           |
| `.fadeIn()`    | Animación fade in       |
| `.hide()`      | Ocultar elemento        |
| `.slideDown()` | Animación slide down    |
| `.map()`       | Mapear arrays           |
| `.join()`      | Unir arrays en string   |

## API Pokémon

La app utiliza **PokéAPI** (https://pokeapi.co/)

Endpoint usado:

```
https://pokeapi.co/api/v2/pokemon/{id|nombre}
```

Datos obtenidos:

- ID y nombre
- Sprite (imagen oficial)
- Tipos
- Altura y peso
- Habilidades
- Estadísticas base

## Tipos de Pokémon y Colores

Cada tipo tiene un color distintivo:

- Fire: 🔥 Naranja
- Water: 💧 Azul
- Grass: 🌿 Verde
- Electric: ⚡ Amarillo
- Psychic: 💜 Rosa
- Dragon: 🐉 Púrpura
- Y muchos más...

## Cómo Usar

1. Abre `pokemon.html` en tu navegador
2. Escribe el nombre o ID de un Pokémon
3. Haz clic en "Buscar" o presiona Enter
4. Observa la información detallada con animaciones

## Ejemplos de Búsqueda

- pikachu
- charizard
- dragonite
- 25 (ID de Pikachu)
- 6 (ID de Charizard)

## Mejoras Posibles

💡 Agregar favoritos guardados en localStorage
💡 Buscar evoluciones del Pokémon
💡 Comparar dos Pokémon
💡 Listar Pokémon por tipo
💡 Agregar paginación

## Recursos

- [PokéAPI Documentación](https://pokeapi.co/)
- [jQuery AJAX](https://api.jquery.com/jquery.ajax/)
- [Sprites Pokémon Oficiales](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/)
