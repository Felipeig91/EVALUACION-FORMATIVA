// Sistema de contacto mejorado con jQuery
$(document).ready(function() {
  const $form = $("#contactForm");
  const $emailInput = $("#email");
  const $asuntoInput = $("#asunto");
  const $telefonoInput = $("#telefono");
  const $mensajeInput = $("#mensaje");
  const $nombreInput = $("#nombre");
  const $rolInput = $("#rol");
  const $motivoInput = $("#motivo");
  const $consentimientoInput = $("#consentimiento");
  const $charCountSpan = $("#charCount");
  const $ccEmailInput = $("#ccEmail");
  const $hiddenSubject = $("#hiddenSubject");
  const $nextUrlInput = $("#nextUrl");
  const $successModalElement = $("#successModal");
  const params = new URLSearchParams(window.location.search);
  const currentPath = window.location.origin + window.location.pathname;

  if ($form.length === 0) return;

  // ==================== VALIDACIONES PERSONALIZADAS ====================

  const validateNombre = function() {
    const nombre = $nombreInput.val().trim();
    if (nombre.length < 3) {
      $nombreInput[0].setCustomValidity("El nombre debe tener al menos 3 caracteres.");
      return false;
    }
    if (/\d/.test(nombre)) {
      $nombreInput[0].setCustomValidity("El nombre no debe contener números.");
      return false;
    }
    $nombreInput[0].setCustomValidity("");
    return true;
  };

  const validateEmail = function() {
    const email = $emailInput.val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $emailInput[0].setCustomValidity("Por favor ingresa un correo electrónico válido.");
      return false;
    }
    $emailInput[0].setCustomValidity("");
    return true;
  };

  const validateTelefono = function() {
    const telefono = $telefonoInput.val().trim();
    const soloDigitos = telefono.replace(/\D/g, "");
    if (soloDigitos.length < 7) {
      $telefonoInput[0].setCustomValidity("El teléfono debe contener al menos 7 dígitos.");
      return false;
    }
    $telefonoInput[0].setCustomValidity("");
    return true;
  };

  const validateAsunto = function() {
    const asunto = $asuntoInput.val().trim();
    if (asunto.length < 5 || asunto.length > 100) {
      $asuntoInput[0].setCustomValidity("El asunto debe tener entre 5 y 100 caracteres.");
      return false;
    }
    $asuntoInput[0].setCustomValidity("");
    return true;
  };

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

  const validateRol = function() {
    if (!$rolInput.val()) {
      $rolInput[0].setCustomValidity("Por favor selecciona un tipo de usuario.");
      return false;
    }
    $rolInput[0].setCustomValidity("");
    return true;
  };

  const validateMotivo = function() {
    if (!$motivoInput.val()) {
      $motivoInput[0].setCustomValidity("Por favor selecciona un motivo.");
      return false;
    }
    $motivoInput[0].setCustomValidity("");
    return true;
  };

  const validateConsentimiento = function() {
    if (!$consentimientoInput.is(':checked')) {
      $consentimientoInput[0].setCustomValidity("Debes aceptar el tratamiento de datos.");
      return false;
    }
    $consentimientoInput[0].setCustomValidity("");
    return true;
  };

  // ==================== EVENT LISTENERS CON JQUERY ====================

  // Validación en tiempo real con jQuery - más conciso
  $nombreInput.on('blur input', validateNombre);
  $emailInput.on('blur input', validateEmail);
  $telefonoInput.on('blur input', validateTelefono);
  $asuntoInput.on('blur input', validateAsunto);
  $motivoInput.on('change', validateMotivo);
  $rolInput.on('change', validateRol);
  
  $mensajeInput.on('blur', validateMensaje);
  $mensajeInput.on('input', function() {
    validateMensaje();
    // Actualizar contador de caracteres con jQuery
    if ($charCountSpan.length) {
      $charCountSpan.text($mensajeInput.val().length);
    }
  });
  
  $consentimientoInput.on('change', validateConsentimiento);

  // ==================== CONFIGURACIÓN INICIAL ====================

  if ($nextUrlInput.length) {
    $nextUrlInput.val(`${currentPath}?enviado=1`);
  }

  if (params.get("enviado") === "1" && $successModalElement.length) {
    const successModal = new bootstrap.Modal($successModalElement[0]);
    successModal.show();

    setTimeout(() => {
      window.location.href = currentPath;
    }, 5000);
  }

  // ==================== VALIDACIÓN AL ENVIAR ====================

  $form.on('submit', function(event) {
    // Validar todos los campos
    const isNombreValid = validateNombre();
    const isEmailValid = validateEmail();
    const isTelefonoValid = validateTelefono();
    const isAsuntoValid = validateAsunto();
    const isMensajeValid = validateMensaje();
    const isRolValid = validateRol();
    const isMotivoValid = validateMotivo();
    const isConsentimientoValid = validateConsentimiento();

    // Si algún campo no es válido, prevenir envío
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
      event.preventDefault();
      event.stopPropagation();
      $form.addClass("was-validated");

      // Mostrar alerta
      alert("⚠️ Los datos ingresados son inválidos. Por favor, revisa los errores marcados y completa todos los campos requeridos.");

      // Scroll al primer error con jQuery
      const $firstInvalid = $form.find(".is-invalid").first();
      if ($firstInvalid.length) {
        $('html, body').animate({
          scrollTop: $firstInvalid.offset().top - 100
        }, 500);
        $firstInvalid.focus();
      }
      return false;
    }

    // Si todo es válido, proceder
    $form.addClass("was-validated");
    $ccEmailInput.val($emailInput.val().trim());
    $hiddenSubject.val(`Contacto Portal Talentos - ${$asuntoInput.val().trim()}`);
  });
});
