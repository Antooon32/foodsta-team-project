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
// FORM VALIDATION
// =======================

const form = document.querySelector(".modal-form");
const nameInput = form.elements.name;
const phoneInput = form.elements.tel;
const emailInput = form.elements.email;

const touched = {
  name: false,
  tel: false,
  email: false,
};

// ---------- helpers ----------
function showError(input, message) {
  clearError(input);
  input.style.borderColor = "#ff6b6b";

  const error = document.createElement("p");
  error.className = "form-error";
  error.textContent = message;
  error.style.color = "#ff6b6b";
  error.style.fontSize = "12px";
  error.style.marginTop = "4px";

  input.closest(".modal__label").appendChild(error);
}

function clearError(input) {
  input.style.borderColor = "var(--dark__green1)";
  const error = input.closest(".modal__label").querySelector(".form-error");
  if (error) error.remove();
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
      showError(phoneInput, "This phone must be in the format 099 000 00 00");
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
});

phoneInput.addEventListener("input", () => {
  touched.tel = true;
  validatePhone();
});

emailInput.addEventListener("input", () => {
  touched.email = true;
  validateEmail();
});

// ---------- submit ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  touched.name = touched.tel = touched.email = true;

  const isValid =
    validateName() &
    validatePhone() &
    validateEmail();

  if (!isValid) {
    showGlobalError();
    return;
  }

  removeGlobalError();

  console.log("SEND DATA:", {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
  });

  closeModal();
});

// ---------- global error ----------
function showGlobalError() {
  if (form.querySelector(".global-error")) return;

  const error = document.createElement("div");
  error.className = "global-error";
  error.textContent = "All fields are required";
  error.style.background = "#ff6b6b";
  error.style.color = "#fff";
  error.style.padding = "8px 16px";
  error.style.borderRadius = "20px";
  error.style.textAlign = "center";

  form.appendChild(error);
}

function removeGlobalError() {
  const error = form.querySelector(".global-error");
  if (error) error.remove();
}

// ---------- reset ----------
function resetForm() {
  form.reset();
  removeGlobalError();

  Object.keys(touched).forEach(key => touched[key] = false);

  [nameInput, phoneInput, emailInput].forEach(input => {
    input.style.borderColor = "var(--dark__green1)";
    clearError(input);
  });
}
