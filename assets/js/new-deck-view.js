import { fetchedDecks } from "./decks.js";
import { generateModal } from "./modal.js";
import { addDeck } from "./api.js";

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

/**
 * Normalizes a color value to a lowercase 6-digit hex string.
 * Returns the default green color if the input is invalid or missing.
 *
 * @param {string} color - A hex color string with or without a leading "#".
 * @returns {string} A normalized hex color string (e.g. "#64d583").
 */
function normalizeColor(color) {
  if (!color) return "#64d583";

  let hex = color.startsWith("#") ? color.slice(1) : color;

  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return "#" + hex.toLowerCase();
  }

  return "#64d583";
}

/**
 * Enables or disables the submit button based on whether the textarea meets its minimum length.
 */
function updateSubmitState() {
  if (!textarea || !submitBtn) return;

  const minLength = Number(textarea.minLength || 0);
  const isValid = textarea.value.trim().length >= minLength;

  submitBtn.disabled = !isValid;
}

/**
 * Attempts to parse a JSON string, returning null if parsing fails.
 *
 * @param {string} value - The string to parse.
 * @returns {object|null} The parsed object, or null if invalid JSON.
 */
function parseJSON(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Validates a deck name, ensuring it is a string between 2 and 80 characters.
 *
 * @param {string} name - The name to validate.
 * @returns {string|null} The trimmed name if valid, or null if invalid.
 */
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

/**
 * Handles the new deck form submission: validates input, calls the API, and navigates on success.
 *
 * @param {SubmitEvent} evt - The form submit event.
 */
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

  addDeck({
    name: validName,
    cards: jsonData.cards,
    color: normalizeColor(values.color),
  })
    .then((newDeck) => {
      fetchedDecks.push(newDeck);
      window.location.hash = "deck-view/" + newDeck._id;
    })
    .catch(showError);
}

if (textarea && submitBtn && submitForm) {
  textarea.addEventListener("input", updateSubmitState);
  submitForm.addEventListener("submit", createNewDeck);
  updateSubmitState();
}

/**
 * Displays an error message in the error modal.
 *
 * @param {string} message - The error message to display.
 */
function showError(message) {
  errorMessageEl.textContent = message;
  openErrorModal();
}

export { normalizeColor, createNewDeck, updateSubmitState, showError };
