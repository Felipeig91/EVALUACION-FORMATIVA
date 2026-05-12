# Troubleshooting - Pokédex

## Si no funciona la búsqueda de Pokémon, sigue estos pasos:

### 1. Abre la Consola del Navegador (F12)

- En Windows/Linux: `F12`
- En Mac: `Cmd + Option + I`

### 2. Ve a la pestaña "Console"

### 3. En el campo de entrada, escribe:

```javascript
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((r) => r.json())
  .then((d) => console.log("✓ API funciona", d))
  .catch((e) => console.log("✗ Error:", e.message));
```

### 4. Presiona Enter

#### Si ves "✓ API funciona":

- La API está funcionando correctamente
- El problema está en el script o en cómo se renderiza

#### Si ves "✗ Error":

- Hay un problema de CORS o conexión
- Intenta abrir esta URL en una nueva pestaña:
  https://pokeapi.co/api/v2/pokemon/pikachu
- Deberías ver un JSON con los datos

---

## Soluciones posibles:

### Solución 1: Limpiar caché del navegador

1. Presiona `Ctrl+Shift+Del` (Windows) o `Cmd+Shift+Delete` (Mac)
2. Selecciona "Caché" y "Cookies"
3. Haz clic en "Limpiar datos"
4. Recarga la página (F5)

### Solución 2: Probar en incógnito

1. Abre una ventana incógnita/privada
2. Ve a: `pokemon/pokemon.html`
3. Intenta buscar

### Solución 3: Verificar jQuery

En la consola, escribe:

```javascript
console.log(jQuery.fn.jquery);
```

Debería mostrar la versión (ejemplo: 3.6.0)

---

## Información de prueba

Pokémon para probar:

- Pikachu (ID: 25)
- Charizard (ID: 6)
- Dragonite (ID: 149)

---

Si aún así no funciona, copia el mensaje de error exacto de la consola.
