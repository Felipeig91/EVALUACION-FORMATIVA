/**
 * ========================================
 * POKÉDEX - Script Vanilla JavaScript
 * ========================================
 * 
 * PROPÓSITO: Implementar un buscador de Pokémon que permite
 * a los usuarios buscar por nombre o ID y ver detalles completos
 * como imagen, tipo, altura, peso, habilidades y estadísticas.
 * 
 * TECNOLOGÍA: Vanilla JavaScript (sin jQuery) para máxima compatibilidad
 * API: PokéAPI (https://pokeapi.co/api/v2/pokemon)
 * PROXIES CORS: cors.bridged.cc (primario) y api.codetabs.com (fallback)
 * 
 * FLUJO:
 * 1. Usuario ingresa nombre o ID de Pokémon
 * 2. Script busca en PokéAPI a través de proxy CORS
 * 3. Si falla el proxy primario, intenta el alternativo
 * 4. Si obtiene datos, muestra la información formateada
 * 5. Si falla, muestra mensaje de error al usuario
 */

console.log("✅ Cargando script Pokédex...");

// ==================== CONFIGURACIÓN GLOBAL ====================

// URL base de PokéAPI para obtener datos de Pokémon
const API_URL = "https://pokeapi.co/api/v2/pokemon";

// Proxy CORS principal - permite eludir restricciones de CORS
// Necesario porque PokéAPI no incluye headers CORS en algunas llamadas
const CORS_PROXY = "https://cors.bridged.cc/";

/**
 * FUNCIÓN PRINCIPAL: initPokeDex()
 * 
 * Se ejecuta cuando el DOM está completamente cargado.
 * Configura los elementos HTML y agrega event listeners.
 * 
 * ELEMENTOS QUE BUSCA EN EL HTML:
 * - searchBtn: Botón para iniciar búsqueda
 * - pokemonInput: Campo de texto para ingresar nombre/ID
 * - loadingDiv: Indicador de carga (oculto por defecto)
 * - errorDiv: Contenedor para mensajes de error
 * - pokemonCard: Tarjeta que muestra los datos del Pokémon
 */
function initPokeDex() {
  console.log("🚀 Inicializando Pokédex");
  
  // ==================== REFERENCIAS A ELEMENTOS DOM ====================
  // Obtener referencias a los elementos HTML que usaremos
  const searchBtn = document.getElementById("searchBtn");
  const pokemonInput = document.getElementById("pokemonInput");
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const pokemonCard = document.getElementById("pokemonCard");
  
  // Validar que el botón existe en el HTML
  if (!searchBtn) {
    console.error("❌ No se encontró el botón de búsqueda");
    return; // Salir si no encontramos el elemento crítico
  }
  
  console.log("✓ Elementos del DOM encontrados");
  
  // ==================== CONFIGURACIÓN DE EVENT LISTENERS ====================
  
  // Evento: Click en botón de búsqueda
  // Obtiene el valor del input, lo valida y llamaa searchPokemon()
  searchBtn.addEventListener("click", function() {
    const name = pokemonInput.value.trim().toLowerCase();
    if (!name) {
      showError("Por favor ingresa un nombre o ID");
      return;
    }
    searchPokemon(name);
  });
  
  // Evento: Presionar Enter en el campo de texto
  // Simula un click en el botón de búsqueda para mayor usabilidad
  pokemonInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      searchBtn.click(); // Dispara la búsqueda al presionar Enter
    }
  });
  
  /**
   * FUNCIÓN: searchPokemon(name)
   * 
   * Busca un Pokémon en la API usando el nombre o ID proporcionado.
   * Maneja la visualización del estado de carga y errores.
   * 
   * PARÁMETROS:
   * - name (string): Nombre o ID del Pokémon a buscar (ej: "pikachu" o "25")
   */
  function searchPokemon(name) {
    console.log("🔍 Buscando:", name);
    
    // Mostrar indicador de carga y ocultar resultados anteriores
    loadingDiv.style.display = "block";
    errorDiv.style.display = "none";
    pokemonCard.style.display = "none";
    
    // Construir las URLs para la solicitud
    // URL original: https://pokeapi.co/api/v2/pokemon/pikachu
    // URL con proxy: https://cors.bridged.cc/https://pokeapi.co/api/v2/pokemon/pikachu
    const url = API_URL + "/" + name;
    const corsUrl = CORS_PROXY + url;
    console.log("📍 URL Original:", url);
    console.log("📍 URL con CORS:", corsUrl);
    
    // Realizar solicitud HTTP GET a la API a través del proxy
    fetch(corsUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json" // Especificar que esperamos JSON
      }
    })
      // PRIMER .then: Procesar la respuesta HTTP
      .then(function(response) {
        console.log("📡 Respuesta Status:", response.status);
        
        // Verificar si la solicitud fue exitosa (status 200-299)
        if (!response.ok) {
          throw new Error("Pokémon no encontrado (Status: " + response.status + ")");
        }
        
        // Convertir la respuesta a JSON
        return response.json();
      })
      // SEGUNDO .then: Manejar los datos exitosamente recibidos
      .then(function(data) {
        console.log("✅ Datos recibidos:");
        console.log(data);
        
        // Ocultar indicador de carga
        loadingDiv.style.display = "none";
        
        // Pasar datos al función que los muestra en la página
        displayPokemon(data);
      })
      // .catch: Manejar errores en la solicitud
      .catch(function(error) {
        console.error("❌ Error en Fetch:", error);
        loadingDiv.style.display = "none";
        
        // Si falla el proxy principal, intentar con el alternativo
        console.log("🔄 Intentando con proxy alternativo...");
        tryAlternativeProxy(name, loadingDiv, errorDiv, pokemonCard);
      });
  }
  
  /**
   * FUNCIÓN: tryAlternativeProxy(name, loadingDiv, errorDiv, pokemonCard)
   * 
   * Función de respaldo que intenta conectar usando un proxy CORS alternativo
   * si el proxy principal falla.
   * 
   * Usa api.codetabs.com como alternativa a cors.bridged.cc
   */
  function tryAlternativeProxy(name, loadingDiv, errorDiv, pokemonCard) {
    // Configurar proxy alternativo
    // Formato: https://api.codetabs.com/v1/proxy?quest=<URL_ENCODED_API_URL>
    const altProxy = "https://api.codetabs.com/v1/proxy?quest=";
    const url = API_URL + "/" + name;
    const altUrl = altProxy + encodeURIComponent(url); // URL codificada
    
    console.log("📍 URL alternativa:", altUrl);
    
    fetch(altUrl)
      .then(function(response) {
        console.log("📡 Respuesta alternativa Status:", response.status);
        if (!response.ok) {
          throw new Error("Pokémon no encontrado");
        }
        return response.json();
      })
      .then(function(data) {
        console.log("✅ Datos recibidos del proxy alternativo:");
        console.log(data);
        loadingDiv.style.display = "none";
        
        // Si el proxy alternativo funciona, mostrar el Pokémon
        displayPokemon(data);
      })
      .catch(function(error) {
        console.error("❌ Error con proxy alternativo:", error);
        loadingDiv.style.display = "none";
        
        // Si ambos proxies fallan, mostrar mensaje de error al usuario
        showError("❌ No se pudo conectar a la API. Intenta nuevamente.");
      });
  }
  
  /**
   * FUNCIÓN: displayPokemon(pokemon)
   * 
   * Toma los datos del Pokémon recibidos de la API
   * y los muestra formateados en la página HTML.
   * 
   * PARÁMETRO:
   * - pokemon (object): Objeto con los datos completos del Pokémon
   *   Incluye: id, name, sprites, height, weight, types, abilities, stats
   */
  function displayPokemon(pokemon) {
    console.log("🎨 Mostrando:", pokemon.name);
    
    // Usar try-catch para manejar errores en la manipulación del DOM
    try {
      // ==================== INFORMACIÓN BÁSICA ====================
      // ID del Pokémon (ej: 25 para Pikachu)
      document.getElementById("pokemonId").textContent = pokemon.id;
      
      // Nombre capitalizado (pikachu -> Pikachu)
      document.getElementById("pokemonName").textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      
      // ==================== IMAGEN ====================
      // Buscar la mejor imagen disponible con fallbacks
      let imgUrl = "";
      // Prioridad 1: Usar artwork oficial (mejor calidad)
      if (pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other["official-artwork"] && pokemon.sprites.other["official-artwork"].front_default) {
        imgUrl = pokemon.sprites.other["official-artwork"].front_default;
      }
      // Prioridad 2: Usar sprite frontal normal si no hay artwork
      else if (pokemon.sprites && pokemon.sprites.front_default) {
        imgUrl = pokemon.sprites.front_default;
      }
      // Prioridad 3: Usar imagen de fallback (Bulbasaur) si nada funciona
      else {
        imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
      }
      
      // Asignar la URL de imagen al elemento IMG
      document.getElementById("pokemonImage").src = imgUrl;
      
      // ==================== ALTURA Y PESO ====================
      // La API devuelve valores en decímetros y hectogramos
      // Dividimos entre 10 para convertir a metros y kilogramos
      document.getElementById("pokemonHeight").textContent = pokemon.height ? (pokemon.height / 10).toFixed(1) : "N/A";
      document.getElementById("pokemonWeight").textContent = pokemon.weight ? (pokemon.weight / 10).toFixed(1) : "N/A";
      
      // ==================== TIPOS ====================
      // Crear badges para cada tipo (fuego, agua, eléctrico, etc.)
      // Cada tipo tiene una clase CSS diferente para colorear (type-fire, type-water, etc.)
      let typesHtml = "";
      if (pokemon.types && pokemon.types.length > 0) {
        // Generar HTML: <span class="type-badge type-fuego">Fuego</span>
        typesHtml = pokemon.types.map(t => '<span class="type-badge type-' + t.type.name + '">' + t.type.name + '</span>').join("");
      } else {
        typesHtml = "<span>No disponible</span>";
      }
      document.getElementById("pokemonTypes").innerHTML = typesHtml;
      
      // ==================== HABILIDADES ====================
      // Mostrar lista de habilidades especiales del Pokémon
      let abilitiesHtml = "";
      if (pokemon.abilities && pokemon.abilities.length > 0) {
        // Crear items de lista para cada habilidad
        abilitiesHtml = pokemon.abilities.map(a => "<li>" + a.ability.name + "</li>").join("");
      } else {
        abilitiesHtml = "<li>No disponible</li>";
      }
      document.getElementById("pokemonAbilities").innerHTML = abilitiesHtml;
      
      // ==================== ESTADÍSTICAS ====================
      // Mostrar barras de estadísticas (HP, Ataque, Defensa, etc.)
      let statsHtml = "";
      if (pokemon.stats && pokemon.stats.length > 0) {
        pokemon.stats.forEach(function(stat) {
          // Usar 150 como valor máximo para calcular el ancho de la barra
          const maxValue = 150;
          const percentage = (stat.base_stat / maxValue) * 100; // Calcular porcentaje
          // Construir HTML para la fila de estadística con barra de progreso
          statsHtml += '<div class="stat-row">';  // Contenedor de la estadística
          statsHtml += '<div class="stat-name">' + stat.stat.name + '</div>';  // Nombre (HP, Attack, etc.)
          statsHtml += '<div class="stat-bar"><div class="stat-value" style="width: ' + percentage + '%"></div></div>';  // Barra con ancho dinámico
          statsHtml += '<div class="stat-number">' + stat.base_stat + '</div>';  // Número de estadística
          statsHtml += '</div>';  // Cierre del contenedor
        });
      } else {
        statsHtml = "<p>No disponible</p>";
      }
      document.getElementById("pokemonStats").innerHTML = statsHtml;
      
      // ==================== MOSTRAR TARJETA ====================
      // Hacer visible la tarjeta de Pokémon (estaba oculta durante la búsqueda)
      pokemonCard.style.display = "block";
      console.log("✨ ¡Pokémon mostrado exitosamente!");
      
    } catch (e) {
      // Si ocurre un error al manipular el DOM, mostrarlo en consola y al usuario
      console.error("⚠️ Error al mostrar:", e);
      showError("Error al mostrar los datos");
    }
  }
  
  /**
   * FUNCIÓN: showError(message)
   * 
   * Muestra un mensaje de error al usuario.
   * Oculta la tarjeta de Pokémon e imprime el error en consola.
   * 
   * PARÁMETRO:
   * - message (string): Texto del error a mostrar
   */
  function showError(message) {
    console.error("⚠️", message);
    
    // Mostrar mensaje de error y ocultar resultados previos
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    pokemonCard.style.display = "none";
  }
}

// ==================== EJECUCIÓN INICIAL ====================
// Ejecutar initPokeDex() cuando el DOM esté completamente cargado
// Comprobar si el DOM ya está listo o esperar al evento DOMContentLoaded

if (document.readyState === "loading") {
  // Si aún se está cargando, esperar al evento
  document.addEventListener("DOMContentLoaded", initPokeDex);
} else {
  // Si ya está cargado, ejecutar inmediatamente
  initPokeDex();
}

console.log("✅ Script Pokédex cargado completamente");
