// =======================
// EMAIL VALIDATION (BUTTON STATES)
// =======================

document.addEventListener('DOMContentLoaded', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function initEmailValidation({
    formSelector,
    inputSelector,
    errorSelector,
    buttonSelector,
    errorFontSize = '12px',
    successBg = '#4CAF50',
    errorBg = '#ff6b6b',
    defaultBg = '',
  }) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const input = form.querySelector(inputSelector);
    const errorText = form.querySelector(errorSelector);
    const button = form.querySelector(buttonSelector);

    if (!input || !errorText || !button) return;

    // ---- initial state ----
    button.disabled = true;
    button.style.backgroundColor = defaultBg;

    function setErrorState(message) {
      errorText.textContent = message;
      errorText.style.color = errorBg;
      errorText.style.fontSize = errorFontSize;

      button.disabled = true;
      button.style.backgroundColor = errorBg;
    }

    function setSuccessState() {
      errorText.textContent = '';
      button.disabled = false;
      button.style.backgroundColor = successBg;
    }

    function setDefaultState() {
      errorText.textContent = '';
      button.disabled = true;
      button.style.backgroundColor = defaultBg;
    }

    // -------- live validation --------
    input.addEventListener('input', () => {
      const value = input.value.trim();

      if (value === '') {
        setDefaultState();
        return;
      }

      if (!emailRegex.test(value)) {
        setErrorState('Not a valid email address (example@email.com)');
      } else {
        setSuccessState();
      }
    });

    // -------- submit validation --------
    form.addEventListener('submit', (e) => {
      const value = input.value.trim();

      if (!emailRegex.test(value)) {
        e.preventDefault();
        setErrorState('Not a valid email address (example@email.com)');
      }
    });
  }

  // =======================
  // INIT
  // =======================

  initEmailValidation({
    formSelector: '.footer__form',
    inputSelector: '.footer__input',
    errorSelector: '.footer__error',
    buttonSelector: '.footer__button',
  });

  initEmailValidation({
    formSelector: '.subscribe__form',
    inputSelector: '.subscribe__input',
    errorSelector: '.subscribe__error',
    buttonSelector: '.subscribe__button',
  });
});
