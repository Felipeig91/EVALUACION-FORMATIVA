// ========================================
// POKÉDEX - Script Vanilla JavaScript
// ========================================

console.log("✅ Cargando script Pokédex...");

// API original y múltiples opciones de proxy
const API_URL = "https://pokeapi.co/api/v2/pokemon";
const CORS_PROXY = "https://cors.bridged.cc/";

// Esperar a que el DOM esté listo
function initPokeDex() {
  console.log("🚀 Inicializando Pokédex");
  
  // Obtener elementos
  const searchBtn = document.getElementById("searchBtn");
  const pokemonInput = document.getElementById("pokemonInput");
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const pokemonCard = document.getElementById("pokemonCard");
  
  if (!searchBtn) {
    console.error("❌ No se encontró el botón de búsqueda");
    return;
  }
  
  console.log("✓ Elementos del DOM encontrados");
  
  // Event listeners
  searchBtn.addEventListener("click", function() {
    const name = pokemonInput.value.trim().toLowerCase();
    if (!name) {
      showError("Por favor ingresa un nombre o ID");
      return;
    }
    searchPokemon(name);
  });
  
  pokemonInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });
  
  function searchPokemon(name) {
    console.log("🔍 Buscando:", name);
    
    loadingDiv.style.display = "block";
    errorDiv.style.display = "none";
    pokemonCard.style.display = "none";
    
    const url = API_URL + "/" + name;
    const corsUrl = CORS_PROXY + url;
    console.log("📍 URL Original:", url);
    console.log("📍 URL con CORS:", corsUrl);
    
    fetch(corsUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    })
      .then(function(response) {
        console.log("📡 Respuesta Status:", response.status);
        if (!response.ok) {
          throw new Error("Pokémon no encontrado (Status: " + response.status + ")");
        }
        return response.json();
      })
      .then(function(data) {
        console.log("✅ Datos recibidos:");
        console.log(data);
        loadingDiv.style.display = "none";
        displayPokemon(data);
      })
      .catch(function(error) {
        console.error("❌ Error en Fetch:", error);
        loadingDiv.style.display = "none";
        
        // Intentar con proxy alternativo
        console.log("🔄 Intentando con proxy alternativo...");
        tryAlternativeProxy(name, loadingDiv, errorDiv, pokemonCard);
      });
  }
  
  function tryAlternativeProxy(name, loadingDiv, errorDiv, pokemonCard) {
    // Proxy alternativo
    const altProxy = "https://api.codetabs.com/v1/proxy?quest=";
    const url = API_URL + "/" + name;
    const altUrl = altProxy + encodeURIComponent(url);
    
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
        displayPokemon(data);
      })
      .catch(function(error) {
        console.error("❌ Error con proxy alternativo:", error);
        loadingDiv.style.display = "none";
        showError("❌ No se pudo conectar a la API. Intenta nuevamente.");
      });
  }
  
  function displayPokemon(pokemon) {
    console.log("🎨 Mostrando:", pokemon.name);
    
    try {
      document.getElementById("pokemonId").textContent = pokemon.id;
      document.getElementById("pokemonName").textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      
      // Imagen
      let imgUrl = "";
      if (pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other["official-artwork"] && pokemon.sprites.other["official-artwork"].front_default) {
        imgUrl = pokemon.sprites.other["official-artwork"].front_default;
      } else if (pokemon.sprites && pokemon.sprites.front_default) {
        imgUrl = pokemon.sprites.front_default;
      } else {
        imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
      }
      document.getElementById("pokemonImage").src = imgUrl;
      
      // Altura y peso
      document.getElementById("pokemonHeight").textContent = pokemon.height ? (pokemon.height / 10).toFixed(1) : "N/A";
      document.getElementById("pokemonWeight").textContent = pokemon.weight ? (pokemon.weight / 10).toFixed(1) : "N/A";
      
      // Tipos
      let typesHtml = "";
      if (pokemon.types && pokemon.types.length > 0) {
        typesHtml = pokemon.types.map(t => '<span class="type-badge type-' + t.type.name + '">' + t.type.name + '</span>').join("");
      } else {
        typesHtml = "<span>No disponible</span>";
      }
      document.getElementById("pokemonTypes").innerHTML = typesHtml;
      
      // Habilidades
      let abilitiesHtml = "";
      if (pokemon.abilities && pokemon.abilities.length > 0) {
        abilitiesHtml = pokemon.abilities.map(a => "<li>" + a.ability.name + "</li>").join("");
      } else {
        abilitiesHtml = "<li>No disponible</li>";
      }
      document.getElementById("pokemonAbilities").innerHTML = abilitiesHtml;
      
      // Estadísticas
      let statsHtml = "";
      if (pokemon.stats && pokemon.stats.length > 0) {
        pokemon.stats.forEach(function(stat) {
          const maxValue = 150;
          const percentage = (stat.base_stat / maxValue) * 100;
          statsHtml += '<div class="stat-row">';
          statsHtml += '<div class="stat-name">' + stat.stat.name + '</div>';
          statsHtml += '<div class="stat-bar"><div class="stat-value" style="width: ' + percentage + '%"></div></div>';
          statsHtml += '<div class="stat-number">' + stat.base_stat + '</div>';
          statsHtml += '</div>';
        });
      } else {
        statsHtml = "<p>No disponible</p>";
      }
      document.getElementById("pokemonStats").innerHTML = statsHtml;
      
      // Mostrar tarjeta
      pokemonCard.style.display = "block";
      console.log("✨ ¡Pokémon mostrado exitosamente!");
      
    } catch (e) {
      console.error("⚠️ Error al mostrar:", e);
      showError("Error al mostrar los datos");
    }
  }
  
  function showError(message) {
    console.error("⚠️", message);
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    pokemonCard.style.display = "none";
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPokeDex);
} else {
  initPokeDex();
}

console.log("✅ Script Pokédex cargado completamente");
