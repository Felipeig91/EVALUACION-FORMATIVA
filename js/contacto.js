document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("email");
  const asuntoInput = document.getElementById("asunto");
  const telefonoInput = document.getElementById("telefono");
  const mensajeInput = document.getElementById("mensaje");
  const nombreInput = document.getElementById("nombre");
  const rolInput = document.getElementById("rol");
  const motivoInput = document.getElementById("motivo");
  const consentimientoInput = document.getElementById("consentimiento");
  const charCountSpan = document.getElementById("charCount");
  const ccEmailInput = document.getElementById("ccEmail");
  const hiddenSubject = document.getElementById("hiddenSubject");
  const nextUrlInput = document.getElementById("nextUrl");
  const successModalElement = document.getElementById("successModal");
  const params = new URLSearchParams(window.location.search);
  const currentPath = window.location.origin + window.location.pathname;

  if (!form) return;

  // ==================== VALIDACIONES PERSONALIZADAS ====================

  /**
   * Valida que el nombre tenga al menos 3 caracteres y no contenga números
   */
  const validateNombre = () => {
    const nombre = nombreInput.value.trim();
    if (nombre.length < 3) {
      nombreInput.setCustomValidity("El nombre debe tener al menos 3 caracteres.");
      return false;
    }
    if (/\d/.test(nombre)) {
      nombreInput.setCustomValidity("El nombre no debe contener números.");
      return false;
    }
    nombreInput.setCustomValidity("");
    return true;
  };

  /**
   * Valida formato de email
   */
  const validateEmail = () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailInput.setCustomValidity("Por favor ingresa un correo electrónico válido.");
      return false;
    }
    emailInput.setCustomValidity("");
    return true;
  };

  /**
   * Valida que el teléfono tenga al menos 7 dígitos
   */
  const validateTelefono = () => {
    const telefono = telefonoInput.value.trim();
    const soloDigitos = telefono.replace(/\D/g, "");
    if (soloDigitos.length < 7) {
      telefonoInput.setCustomValidity("El teléfono debe contener al menos 7 dígitos.");
      return false;
    }
    telefonoInput.setCustomValidity("");
    return true;
  };

  /**
   * Valida que el asunto tenga entre 5 y 100 caracteres
   */
  const validateAsunto = () => {
    const asunto = asuntoInput.value.trim();
    if (asunto.length < 5 || asunto.length > 100) {
      asuntoInput.setCustomValidity("El asunto debe tener entre 5 y 100 caracteres.");
      return false;
    }
    asuntoInput.setCustomValidity("");
    return true;
  };

  /**
   * Valida que el mensaje tenga entre 20 y 1000 caracteres
   */
  const validateMensaje = () => {
    const mensaje = mensajeInput.value.trim();
    if (mensaje.length < 20) {
      mensajeInput.setCustomValidity("El mensaje debe tener al menos 20 caracteres.");
      return false;
    }
    if (mensaje.length > 1000) {
      mensajeInput.setCustomValidity("El mensaje no puede exceder 1000 caracteres.");
      return false;
    }
    mensajeInput.setCustomValidity("");
    return true;
  };

  /**
   * Valida que se haya seleccionado un rol
   */
  const validateRol = () => {
    if (!rolInput.value) {
      rolInput.setCustomValidity("Por favor selecciona un tipo de usuario.");
      return false;
    }
    rolInput.setCustomValidity("");
    return true;
  };

  /**
   * Valida que se haya seleccionado un motivo
   */
  const validateMotivo = () => {
    if (!motivoInput.value) {
      motivoInput.setCustomValidity("Por favor selecciona un motivo.");
      return false;
    }
    motivoInput.setCustomValidity("");
    return true;
  };

  /**
   * Valida que se haya aceptado el consentimiento
   */
  const validateConsentimiento = () => {
    if (!consentimientoInput.checked) {
      consentimientoInput.setCustomValidity("Debes aceptar el tratamiento de datos.");
      return false;
    }
    consentimientoInput.setCustomValidity("");
    return true;
  };

  // ==================== EVENT LISTENERS PARA VALIDACIÓN EN TIEMPO REAL ====================

  nombreInput.addEventListener("blur", validateNombre);
  nombreInput.addEventListener("input", validateNombre);

  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", validateEmail);

  telefonoInput.addEventListener("blur", validateTelefono);
  telefonoInput.addEventListener("input", validateTelefono);

  asuntoInput.addEventListener("blur", validateAsunto);
  asuntoInput.addEventListener("input", validateAsunto);

  motivoInput.addEventListener("change", validateMotivo);

  rolInput.addEventListener("change", validateRol);

  mensajeInput.addEventListener("blur", validateMensaje);
  mensajeInput.addEventListener("input", (e) => {
    validateMensaje();
    // Actualizar contador de caracteres
    if (charCountSpan) {
      charCountSpan.textContent = mensajeInput.value.length;
    }
  });

  consentimientoInput.addEventListener("change", validateConsentimiento);

  // ==================== CONFIGURACIÓN INICIAL ====================

  if (nextUrlInput) {
    nextUrlInput.value = `${currentPath}?enviado=1`;
  }

  if (params.get("enviado") === "1" && successModalElement) {
    const successModal = new bootstrap.Modal(successModalElement);
    successModal.show();

    setTimeout(() => {
      window.location.href = currentPath;
    }, 5000);
  }

  // ==================== VALIDACIÓN AL ENVIAR ====================

  form.addEventListener("submit", (event) => {
    // Validar todos los campos antes de enviar
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
      form.classList.add("was-validated");

      // Scroll al primer error
      const firstInvalidElement = form.querySelector(".is-invalid");
      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalidElement.focus();
      }
      return;
    }

    // Si todo es válido, proceder con el envío
    form.classList.add("was-validated");

    // Send a copy to the user's email so both admin and user receive the message.
    ccEmailInput.value = emailInput.value.trim();

    // Use the typed subject as part of the outgoing email subject.
    hiddenSubject.value = `Contacto Portal Talentos - ${asuntoInput.value.trim()}`;
  });
});
