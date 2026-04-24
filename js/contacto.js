document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("email");
  const asuntoInput = document.getElementById("asunto");
  const ccEmailInput = document.getElementById("ccEmail");
  const hiddenSubject = document.getElementById("hiddenSubject");
  const nextUrlInput = document.getElementById("nextUrl");
  const successModalElement = document.getElementById("successModal");
  const params = new URLSearchParams(window.location.search);
  const currentPath = window.location.origin + window.location.pathname;

  if (!form) return;

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

  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    // Send a copy to the user's email so both admin and user receive the message.
    ccEmailInput.value = emailInput.value.trim();

    // Use the typed subject as part of the outgoing email subject.
    hiddenSubject.value = `Contacto Portal Talentos - ${asuntoInput.value.trim()}`;
  });
});
