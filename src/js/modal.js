// =======================
// MODAL CONTROL
// =======================

const openModalBtns = document.querySelectorAll("[data-modal-open]");
const modalBackdrop = document.querySelector("[data-modal]");
const closeModalBtn = document.querySelector("[data-modal-close]");

openModalBtns.forEach(btn => btn.addEventListener("click", openModal));
closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", onBackdropClick);
window.addEventListener("keydown", onEscPress);

function openModal() {
  modalBackdrop.classList.remove("is-hidden");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  modalBackdrop.classList.add("is-hidden");
  document.body.classList.remove("no-scroll");
  resetForm();
}

function onBackdropClick(e) {
  if (e.target === modalBackdrop) closeModal();
}

function onEscPress(e) {
  if (e.key === "Escape" && !modalBackdrop.classList.contains("is-hidden")) {
    closeModal();
  }
}

// =======================
// FORM VALIDATION (FULL)
// =======================

const form = document.querySelector(".modal-form");
const nameInput = form.elements.name;
const phoneInput = form.elements.tel;
const emailInput = form.elements.email;
const submitBtn = form.querySelector(".modal__submit");

const touched = {
  name: false,
  tel: false,
  email: false,
};

// ---------- helpers ----------
function getErrorEl(input) {
  return input.closest(".modal__label").querySelector(".form-error");
}

function showError(input, message) {
  const error = getErrorEl(input);
  error.textContent = message;
  input.style.borderColor = "#ff6b6b";
}

function clearError(input) {
  const error = getErrorEl(input);
  error.textContent = "";
  input.style.borderColor = "var(--dark__green1)";
}

function setValid(input) {
  clearError(input);
  input.style.borderColor = "#9acd32";
}

// ---------- validators ----------
function validateName() {
  const value = nameInput.value.trim();
  const regex = /^[a-zA-Zа-яА-ЯїієґЇІЄҐ\s]{3,25}$/;

  clearError(nameInput);

  if (!value) {
    if (touched.name) showError(nameInput, "This field is required");
    return false;
  }

  if (!regex.test(value)) {
    if (touched.name)
      showError(nameInput, "The name must be between 3 and 25 characters");
    return false;
  }

  setValid(nameInput);
  return true;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  const regex = /^\+38\(\d{3}\)\d{3}\s\d{2}\s\d{2}$/;

  clearError(phoneInput);

  if (!value) {
    if (touched.tel) showError(phoneInput, "This field is required");
    return false;
  }

  if (!regex.test(value)) {
    if (touched.tel)
      showError(phoneInput, "Phone format: +38(099)000 00 00");
    return false;
  }

  setValid(phoneInput);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  clearError(emailInput);

  if (!value) {
    if (touched.email) showError(emailInput, "This field is required");
    return false;
  }

  if (!regex.test(value)) {
    if (touched.email)
      showError(emailInput, "Please enter a valid email address");
    return false;
  }

  setValid(emailInput);
  return true;
}

// ---------- submit button state ----------
function updateSubmitButton() {
  const hasAnyValue =
    nameInput.value.trim() ||
    phoneInput.value.trim() ||
    emailInput.value.trim();

  const isFormValid =
    validateName() &&
    validatePhone() &&
    validateEmail();

  // nothing entered
  if (!hasAnyValue) {
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "#ccc";
    submitBtn.style.cursor = "not-allowed";
    return;
  }

  // errors exist
  if (!isFormValid) {
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "#ff6b6b";
    submitBtn.style.cursor = "not-allowed";
    return;
  }

  // all valid
  submitBtn.disabled = false;
  submitBtn.style.backgroundColor = "#9acd32";
  submitBtn.style.cursor = "pointer";
}

// ---------- phone mask ----------
phoneInput.addEventListener("input", () => {
  let digits = phoneInput.value.replace(/\D/g, "").slice(0, 12);

  if (digits.startsWith("38")) digits = digits.slice(2);

  let formatted = "+38(";
  if (digits.length > 0) formatted += digits.slice(0, 3);
  if (digits.length >= 3) formatted += ")";
  if (digits.length > 3) formatted += digits.slice(3, 6);
  if (digits.length > 6) formatted += " " + digits.slice(6, 8);
  if (digits.length > 8) formatted += " " + digits.slice(8, 10);

  phoneInput.value = formatted;
});

// ---------- live validation ----------
nameInput.addEventListener("input", () => {
  touched.name = true;
  validateName();
  updateSubmitButton();
});

phoneInput.addEventListener("input", () => {
  touched.tel = true;
  validatePhone();
  updateSubmitButton();
});

emailInput.addEventListener("input", () => {
  touched.email = true;
  validateEmail();
  updateSubmitButton();
});

// ---------- submit ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  touched.name = touched.tel = touched.email = true;

  const isValid =
    validateName() &&
    validatePhone() &&
    validateEmail();

  if (!isValid) {
    updateSubmitButton();
    return;
  }

  console.log("SEND DATA:", {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
  });

  closeModal();
  resetForm();
});

// ---------- reset ----------
function resetForm() {
  form.reset();

  Object.keys(touched).forEach(key => touched[key] = false);

  [nameInput, phoneInput, emailInput].forEach(input => {
    clearError(input);
  });

  updateSubmitButton();
}

// ---------- init ----------
updateSubmitButton();
