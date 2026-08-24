import { decks } from "./decks.js";
import { generateModal } from "./modal.js";

const textarea = document.querySelector("#new-deck-view__text-area-input");
const submitBtn = document.querySelector("#new-deck-view__submit-btn");
const submitForm = document.querySelector("#new-deck-view-form");
const errorModal = document.querySelector("#error-modal");
const errorModalClose = errorModal.querySelector(".modal__close");
const errorMessageEl = errorModal.querySelector(".modal__error");
const openErrorModal = generateModal({
  modalEl: errorModal,
  confirmBtnEl: null,
  cancelBtnEl: errorModalClose,
  visibleClass: "modal_visible",
});

function normalizeColor(color) {
  if (!color) return "#64d583";

  let hex = color.startsWith("#") ? color.slice(1) : color;

  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return "#" + hex.toLowerCase();
  }

  return "#64d583";
}

function slugify(str) {
  const slug = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug;
}

function updateSubmitState() {
  if (!textarea || !submitBtn) return;

  const minLength = Number(textarea.minLength || 0);
  const isValid = textarea.value.trim().length >= minLength;

  submitBtn.disabled = !isValid;
}

function parseJSON(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function validateName(name) {
  if (typeof name !== "string") {
    return null;
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 80) {
    return null;
  }

  return trimmedName;
}

function createNewDeck(evt) {
  evt.preventDefault();

  const formData = new FormData(submitForm);
  const values = Object.fromEntries(formData.entries());

  let isValid = true;

  const jsonData = parseJSON(values["data-json"]);
  if (jsonData === null) {
    isValid = false;
    showError("JSON parsing failed");
    return;
  }

  const validName = validateName(jsonData.name);
  if (validName === null) {
    isValid = false;
    showError("name must be a string between 2 and 80 characters");
    return;
  }

  if (!Array.isArray(jsonData.cards)) {
    isValid = false;
    showError("cards must be an array");
    return;
  }

  if (!isValid) {
    return;
  }

  const newDeck = {
    _id: `${slugify(validName)}-${Date.now()}`,
    slug: `${slugify(validName)}-${Date.now()}`,
    name: validName,
    cards: jsonData.cards,
    color: normalizeColor(values.color),
  };

  decks.push(newDeck);
  window.location.hash = `deck-view/${newDeck._id}`;
}

if (textarea && submitBtn && submitForm) {
  textarea.addEventListener("input", updateSubmitState);
  submitForm.addEventListener("submit", createNewDeck);
  updateSubmitState();
}

function showError(message) {
  errorMessageEl.textContent = message;
  openErrorModal();
}

export { normalizeColor, slugify, createNewDeck, updateSubmitState, showError };
