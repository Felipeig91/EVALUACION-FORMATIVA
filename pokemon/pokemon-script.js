$(document).ready(function () {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon";

  // Buscar al hacer clic en el botón
  $("#searchBtn").click(function () {
    const pokemonName = $("#pokemonInput").val().trim().toLowerCase();

    if (pokemonName === "") {
      showError("Por favor ingresa un nombre o ID de Pokémon");
      return;
    }

    searchPokemon(pokemonName);
  });

  // Buscar al presionar Enter en el input
  $("#pokemonInput").keypress(function (e) {
    if (e.which === 13) {
      $("#searchBtn").click();
    }
  });

  function searchPokemon(pokemonName) {
    // Mostrar loading
    $("#loading").show();
    $("#error").hide();
    $("#pokemonCard").hide();

    $.ajax({
      url: `${apiUrl}/${pokemonName}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        displayPokemon(data);
        $("#loading").hide();
      },
      error: function (xhr, status, error) {
        console.error("Error en la búsqueda:", error);
        showError(
          "Pokémon no encontrado. Intenta con otro nombre o ID válido."
        );
        $("#loading").hide();
      },
    });
  }

  function displayPokemon(pokemon) {
    // Información básica
    $("#pokemonId").text(pokemon.id);
    $("#pokemonName").text(
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    );
    
    // Obtener la mejor imagen disponible
    let imageUrl = pokemon.sprites.other?.["official-artwork"]?.front_default ||
                   pokemon.sprites.front_default ||
                   "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";
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
            `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
        )
        .join("");
      $("#pokemonTypes").html(typesHtml);
    } else {
      $("#pokemonTypes").html("<span>No disponible</span>");
    }

    // Habilidades
    if (pokemon.abilities && pokemon.abilities.length > 0) {
      const abilitiesHtml = pokemon.abilities
        .map((ability) => `<li>${ability.ability.name}</li>`)
        .join("");
      $("#pokemonAbilities").html(abilitiesHtml);
    } else {
      $("#pokemonAbilities").html("<li>No disponible</li>");
    }

    // Estadísticas
    if (pokemon.stats && pokemon.stats.length > 0) {
      const statsHtml = pokemon.stats
        .map((stat) => {
          const maxValue = 150;
          const percentage = (stat.base_stat / maxValue) * 100;
          return `
            <div class="stat-row">
              <div class="stat-name">${stat.stat.name}</div>
              <div class="stat-bar">
                <div class="stat-value" style="width: ${percentage}%">
                </div>
              </div>
              <div class="stat-number">${stat.base_stat}</div>
            </div>
          `;
        })
        .join("");
      $("#pokemonStats").html(statsHtml);
    } else {
      $("#pokemonStats").html("<p>No disponible</p>");
    }

    // Mostrar tarjeta con animación
    $("#pokemonCard").fadeIn(300);
  }

  function showError(message) {
    $("#error").text(message).slideDown(300);
    $("#pokemonCard").hide();
  }
});
