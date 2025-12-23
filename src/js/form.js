// =======================
// EMAIL VALIDATION (UNIVERSAL)
// =======================

document.addEventListener('DOMContentLoaded', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function initEmailValidation({
    formSelector,
    inputSelector,
    errorSelector,
    errorFontSize = '12px',
  }) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const input = form.querySelector(inputSelector);
    const errorText = form.querySelector(errorSelector);

    if (!input || !errorText) return;

    function showError(message) {
      errorText.textContent = message;
      errorText.style.color = '#ff6b6b';
      errorText.style.fontSize = errorFontSize;
    }

    function clearError() {
      errorText.textContent = '';
    }

    // -------- live validation --------
    input.addEventListener('input', () => {
      const value = input.value.trim();

      if (value === '') {
        clearError();
        return;
      }

      if (!emailRegex.test(value)) {
        showError('Not a valid email address (example@email.com)');
      } else {
        clearError();
      }
    });

    // -------- submit validation --------
    form.addEventListener('submit', (e) => {
      const value = input.value.trim();

      if (!emailRegex.test(value)) {
        e.preventDefault();
        showError('Not a valid email address (example@email.com)');
      }
    });
  }

  // =======================
  // INIT FORMS
  // =======================

  initEmailValidation({
    formSelector: '.footer__form',
    inputSelector: '.footer__input',
    errorSelector: '.footer__error',
    errorFontSize: '12px',
  });

  initEmailValidation({
    formSelector: '.subscribe__form',
    inputSelector: '.subscribe__input',
    errorSelector: '.subscribe__error',
    errorFontSize: '12px',
  });
});
