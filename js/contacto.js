/**
 * ========================================
 * SISTEMA DE VALIDACIÓN DE FORMULARIO DE CONTACTO
 * ========================================
 * 
 * PROPÓSITO: Validar en tiempo real todos los campos del formulario de contacto
 * e impedir el envío si hay errores. Usa Bootstrap para estilos de validación.
 * 
 * FLUJO:
 * 1. Se ejecuta cuando el DOM está listo ($(document).ready)
 * 2. Configura event listeners para validación en tiempo real
 * 3. Al hacer submit, valida todos los campos
 * 4. Si todo es válido, envía el formulario
 * 5. Si hay errores, muestra alerta y scroll al primer campo inválido
 * 
 * INTEGRACIONES:
 * - FormSubmit.co: Servicio de formularios para envío de emails
 * - Bootstrap 5: Estilos y clases de validación (.was-validated, .is-invalid)
 * - jQuery: Manejo de eventos y manipulación del DOM
 */

$(document).ready(function() {  // Esperar a que el DOM esté cargado
  
  // ==================== REFERENCIAS A ELEMENTOS HTML ====================
  // Usar $ de jQuery para seleccionar elementos por ID
  const $form = $("#contactForm");  // Formulario principal
  const $emailInput = $("#email");  // Campo de email
  const $asuntoInput = $("#asunto");  // Campo de asunto
  const $telefonoInput = $("#telefono");  // Campo de teléfono
  const $mensajeInput = $("#mensaje");  // Área de texto del mensaje
  const $nombreInput = $("#nombre");  // Campo de nombre
  const $rolInput = $("#rol");  // Select de tipo de usuario
  const $motivoInput = $("#motivo");  // Select de motivo
  const $consentimientoInput = $("#consentimiento");  // Checkbox de consentimiento
  const $charCountSpan = $("#charCount");  // Span para mostrar contador de caracteres
  const $ccEmailInput = $("#ccEmail");  // Campo oculto para CC de email
  const $hiddenSubject = $("#hiddenSubject");  // Campo oculto para asunto del email
  const $nextUrlInput = $("#nextUrl");  // Campo oculto para URL de redireccionamiento
  const $successModalElement = $("#successModal");  // Modal de éxito (Bootstrap)
  
  // Obtener parámetros de URL y ruta actual
  const params = new URLSearchParams(window.location.search);  // Parámetros GET (?enviado=1)
  const currentPath = window.location.origin + window.location.pathname;  // URL actual

  // Si no existe el formulario, salir (página incorrecta)
  if ($form.length === 0) return;

  // ==================== FUNCIONES DE VALIDACIÓN ====================
  
  /**
   * VALIDAR NOMBRE
   * Reglas:
   * - Mínimo 3 caracteres
   * - No puede contener números
   */

  const validateNombre = function() {
    const nombre = $nombreInput.val().trim();  // Obtener valor y eliminar espacios
    
    // Validar longitud mínima
    if (nombre.length < 3) {
      $nombreInput[0].setCustomValidity("El nombre debe tener al menos 3 caracteres.");
      return false;
    }
    
    // Validar que no contenga números (/\d/ = expresión regular para dígitos)
    if (/\d/.test(nombre)) {
      $nombreInput[0].setCustomValidity("El nombre no debe contener números.");
      return false;
    }
    
    // Si pasó todas las validaciones, limpiar mensaje de error
    $nombreInput[0].setCustomValidity("");
    return true;
  };

  /**
   * VALIDAR EMAIL
   * Usa expresión regular para verificar formato de email válido
   */

  const validateEmail = function() {
    const email = $emailInput.val().trim();
    // Expresión regular: debe tener @ y punto, sin espacios
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $emailInput[0].setCustomValidity("Por favor ingresa un correo electrónico válido.");
      return false;
    }
    $emailInput[0].setCustomValidity("");
    return true;
  };

  /**
   * VALIDAR TELÉFONO
   * Reglas:
   * - Mínimo 7 dígitos (se ignoran caracteres especiales)
   */

  const validateTelefono = function() {
    const telefono = $telefonoInput.val().trim();
    // Eliminar caracteres no dígitos (/, -, espacios, etc.)
    const soloDigitos = telefono.replace(/\D/g, "");
    if (soloDigitos.length < 7) {
      $telefonoInput[0].setCustomValidity("El teléfono debe contener al menos 7 dígitos.");
      return false;
    }
    $telefonoInput[0].setCustomValidity("");
    return true;
  };

  /**
   * VALIDAR ASUNTO
   * Reglas:
   * - Mínimo 5 caracteres
   * - Máximo 100 caracteres
   */

  const validateAsunto = function() {
    const asunto = $asuntoInput.val().trim();
    if (asunto.length < 5 || asunto.length > 100) {
      $asuntoInput[0].setCustomValidity("El asunto debe tener entre 5 y 100 caracteres.");
      return false;
    }
    $asuntoInput[0].setCustomValidity("");
    return true;
  };

  /**\n   * VALIDAR MENSAJE\n   * Reglas:\n   * - Mínimo 20 caracteres\n   * - Máximo 1000 caracteres\n   * Este es el mensaje principal que se envía\n   */

  const validateMensaje = function() {
    const mensaje = $mensajeInput.val().trim();
    if (mensaje.length < 20) {
      $mensajeInput[0].setCustomValidity("El mensaje debe tener al menos 20 caracteres.");
      return false;
    }
    if (mensaje.length > 1000) {
      $mensajeInput[0].setCustomValidity("El mensaje no puede exceder 1000 caracteres.");
      return false;
    }
    $mensajeInput[0].setCustomValidity("");
    return true;
  };

  // Validar que se haya seleccionado un rol/tipo de usuario
  const validateRol = function() {
    if (!$rolInput.val()) {
      $rolInput[0].setCustomValidity("Por favor selecciona un tipo de usuario.");
      return false;
    }
    $rolInput[0].setCustomValidity("");
    return true;
  };

  // Validar que se haya seleccionado un motivo
  const validateMotivo = function() {
    if (!$motivoInput.val()) {
      $motivoInput[0].setCustomValidity("Por favor selecciona un motivo.");
      return false;
    }
    $motivoInput[0].setCustomValidity("");
    return true;
  };

  // Validar que se haya aceptado el checkbox de consentimiento
  const validateConsentimiento = function() {
    if (!$consentimientoInput.is(':checked')) {
      $consentimientoInput[0].setCustomValidity("Debes aceptar el tratamiento de datos.");
      return false;
    }
    $consentimientoInput[0].setCustomValidity("");
    return true;
  };

  // ==================== EVENT LISTENERS CON JQUERY ====================
  // Configurar validación en tiempo real: se ejecuta mientras el usuario escribe
  
  // Validar nombre: en blur (pierde foco) e input (mientras escribe)
  $nombreInput.on('blur input', validateNombre);
  $emailInput.on('blur input', validateEmail);
  $telefonoInput.on('blur input', validateTelefono);
  $asuntoInput.on('blur input', validateAsunto);
  
  // Validar selects: cuando cambia la selección
  $motivoInput.on('change', validateMotivo);
  $rolInput.on('change', validateRol);
  
  // Validar mensaje: al perder foco (para no saturar con validaciones)
  $mensajeInput.on('blur', validateMensaje);
  
  // Event listener para el input del mensaje: validar Y actualizar contador de caracteres
  $mensajeInput.on('input', function() {
    validateMensaje();  // Validar mientras escribe
    
    // Mostrar contador dinámico de caracteres (ej: "45/1000")
    if ($charCountSpan.length) {
      $charCountSpan.text($mensajeInput.val().length);
    }
  });
  
  // Validar consentimiento: cuando cambia el estado del checkbox
  $consentimientoInput.on('change', validateConsentimiento);

  // ==================== CONFIGURACIÓN INICIAL ====================
  
  // Establecer la URL de redireccionamiento después de enviar el formulario
  // Será: http://localhost/contacto.html?enviado=1
  if ($nextUrlInput.length) {
    $nextUrlInput.val(`${currentPath}?enviado=1`);
  }

  // Si el formulario ya fue enviado (?enviado=1), mostrar modal de éxito
  if (params.get("enviado") === "1" && $successModalElement.length) {
    // Crear instancia de modal Bootstrap y mostrarlo
    const successModal = new bootstrap.Modal($successModalElement[0]);
    successModal.show();

    // Redirigir después de 5 segundos (dar tiempo al usuario de leer el mensaje)
    setTimeout(() => {
      window.location.href = currentPath;
    }, 5000);
  }

  // ==================== VALIDACIÓN AL ENVIAR ====================
  // Se ejecuta cuando el usuario hace submit del formulario

  $form.on('submit', function(event) {
    // Validar TODOS los campos antes de permitir el envío
    const isNombreValid = validateNombre();
    const isEmailValid = validateEmail();
    const isTelefonoValid = validateTelefono();
    const isAsuntoValid = validateAsunto();
    const isMensajeValid = validateMensaje();
    const isRolValid = validateRol();
    const isMotivoValid = validateMotivo();
    const isConsentimientoValid = validateConsentimiento();

    // Si ALGÚN campo no es válido, prevenir el envío
    if (
      !isNombreValid ||
      !isEmailValid ||
      !isTelefonoValid ||
      !isAsuntoValid ||
      !isMensajeValid ||
      !isRolValid ||
      !isMotivoValid ||
      !isConsentimientoValid
    ) {
      event.preventDefault();  // Cancelar el submit
      event.stopPropagation();  // Evitar que se propague el evento
      
      // Agregar clase Bootstrap para mostrar validaciones visuales
      $form.addClass("was-validated");

      // Mostrar alerta con detalles de qué completar
      alert("⚠️ Formulario incompleto\n\nPor favor, revisa los errores marcados en rojo y completa todos los campos requeridos correctamente.\n\nVerifica:\n• Nombre (mínimo 3 caracteres, sin números)\n• Email válido\n• Teléfono (mínimo 7 dígitos)\n• Tipo de usuario seleccionado\n• Motivo seleccionado\n• Asunto (entre 5 y 100 caracteres)\n• Mensaje (entre 20 y 1000 caracteres)\n• Consentimiento aceptado");

      // Hacer scroll automático al primer campo con error
      const $firstInvalid = $form.find(".is-invalid").first();
      if ($firstInvalid.length) {
        // Animar scroll hasta 100px arriba del campo (para que no quede tapado por navbar)
        $('html, body').animate({
          scrollTop: $firstInvalid.offset().top - 100
        }, 500);  // 500ms de duración
        $firstInvalid.focus();  // Colocar foco en el campo inválido
      }
      return false;  // Detener ejecución
    }

    // ==================== PREPARACIÓN PARA ENVÍO ====================
    // Si todo es válido, preparar datos para FormSubmit.co
    
    $form.addClass("was-validated");  // Mostrar validaciones visuales
    
    // Copiar email a campo oculto de CC (para que reciba copia el usuario)
    $ccEmailInput.val($emailInput.val().trim());
    
    // Establecer asunto del email enviado
    // Formato: "Contacto Portal Talentos - [asunto del usuario]"
    $hiddenSubject.val(`Contacto Portal Talentos - ${$asuntoInput.val().trim()}`);
    
    // El formulario se envía automáticamente a FormSubmit.co
    // (action del form ya está configurado en HTML)
  });
});
