$(document).ready(function () {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon";

  // Buscar al hacer clic en el botón
  $("#searchBtn").on("click", function () {
    const pokemonName = $("#pokemonInput").val().trim().toLowerCase();

    if (pokemonName === "") {
      showError("Por favor ingresa un nombre o ID de Pokémon");
      return;
    }

    searchPokemon(pokemonName);
  });

  // Buscar al presionar Enter en el input
  $("#pokemonInput").on("keypress", function (e) {
    if (e.which === 13) {
      $("#searchBtn").click();
    }
  });

  function searchPokemon(pokemonName) {
    // Mostrar loading
    $("#loading").show();
    $("#error").hide();
    $("#pokemonCard").hide();

    var url = apiUrl + "/" + pokemonName;
    console.log("Buscando en URL:", url);

    fetch(url)
      .then(function(response) {
        console.log("Respuesta recibida:", response.status);
        if (!response.ok) {
          throw new Error("Pokémon no encontrado (Status: " + response.status + ")");
        }
        return response.json();
      })
      .then(function(data) {
        console.log("Datos recibidos:", data);
        displayPokemon(data);
        $("#loading").hide();
      })
      .catch(function(error) {
        console.error("Error en la búsqueda:", error);
        showError("Pokémon no encontrado. Intenta con otro nombre o ID válido. Error: " + error.message);
        $("#loading").hide();
      });
  }

  function displayPokemon(pokemon) {
    try {
      // Información básica
      $("#pokemonId").text(pokemon.id);
      $("#pokemonName").text(
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      );
      
      // Obtener la mejor imagen disponible
      let imageUrl = "";
      if (pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other["official-artwork"] && pokemon.sprites.other["official-artwork"].front_default) {
        imageUrl = pokemon.sprites.other["official-artwork"].front_default;
      } else if (pokemon.sprites && pokemon.sprites.front_default) {
        imageUrl = pokemon.sprites.front_default;
      } else {
        imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
      }
      $("#pokemonImage").attr("src", imageUrl);

      // Altura y peso
      const height = pokemon.height ? (pokemon.height / 10).toFixed(1) : "N/A";
      const weight = pokemon.weight ? (pokemon.weight / 10).toFixed(1) : "N/A";
      $("#pokemonHeight").text(height);
      $("#pokemonWeight").text(weight);

      // Tipos
      if (pokemon.types && pokemon.types.length > 0) {
        const typesHtml = pokemon.types
          .map(
            (type) =>
              "<span class=\"type-badge type-" + type.type.name + "\">" + type.type.name + "</span>"
          )
          .join("");
        $("#pokemonTypes").html(typesHtml);
      } else {
        $("#pokemonTypes").html("<span>No disponible</span>");
      }

      // Habilidades
      if (pokemon.abilities && pokemon.abilities.length > 0) {
        const abilitiesHtml = pokemon.abilities
          .map((ability) => "<li>" + ability.ability.name + "</li>")
          .join("");
        $("#pokemonAbilities").html(abilitiesHtml);
      } else {
        $("#pokemonAbilities").html("<li>No disponible</li>");
      }

      // Estadísticas
      if (pokemon.stats && pokemon.stats.length > 0) {
        let statsHtml = "";
        for (let i = 0; i < pokemon.stats.length; i++) {
          const stat = pokemon.stats[i];
          const maxValue = 150;
          const percentage = (stat.base_stat / maxValue) * 100;
          statsHtml += "<div class=\"stat-row\">";
          statsHtml += "<div class=\"stat-name\">" + stat.stat.name + "</div>";
          statsHtml += "<div class=\"stat-bar\">";
          statsHtml += "<div class=\"stat-value\" style=\"width: " + percentage + "%\"></div>";
          statsHtml += "</div>";
          statsHtml += "<div class=\"stat-number\">" + stat.base_stat + "</div>";
          statsHtml += "</div>";
        }
        $("#pokemonStats").html(statsHtml);
      } else {
        $("#pokemonStats").html("<p>No disponible</p>");
      }

      // Mostrar tarjeta con animación
      $("#pokemonCard").fadeIn(300);
    } catch (e) {
      console.error("Error al procesar los datos:", e);
      showError("Error al procesar los datos del Pokémon");
    }
  }

  function showError(message) {
    $("#error").text(message).slideDown(300);
    $("#pokemonCard").hide();
  }
});
