/*const textarea = document.querySelector("#new-deck-view__text-area-input");
const submitBtn = document.querySelector("#new-deck-view__submit-btn");
const submitForm = document.querySelector("#new-deck-view-form");

function normalizeColor(color) {
  if (!color) {
    return "#64d583";
  }

  let hex = "";
  if (color.startsWith("#")) {
    hex = color.slice(1);
  } else {
    hex = color;
  }

  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return "#" + hex.toLowerCase();
  } else {
    return "#64d583";
  }
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
  const minLength = Number(textarea.minLength || 0);
  const isValid = textarea.value.trim().length >= minLength;

  submitBtn.disabled = !isValid;
}

function createNewDeck(evt) {
  evt.preventDefault();
  const formData = new FormData(submitForm);
  const data = Object.fromEntries(formData.entries());
  const dataObject = JSON.parse(data["data-json"]);
  normalizeColor(color);
}

submitForm.addEventListener("click");

if (textarea && submitBtn) {
  textarea.addEventListener("input", updateSubmitState);
  updateSubmitState();
}

export { updateSubmitState }; */

import { decks } from "./decks.js";

const textarea = document.querySelector("#new-deck-view__text-area-input");
const submitBtn = document.querySelector("#new-deck-view__submit-btn");
const submitForm = document.querySelector("#new-deck-view-form");

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

function createNewDeck(evt) {
  evt.preventDefault();

  const formData = new FormData(submitForm);
  const data = Object.fromEntries(formData.entries());

  const jsonData = JSON.parse(data["data-json"]);

  const newDeck = {
    id: `${slugify(jsonData.name)}-${Date.now()}`,
    slug: `${slugify(jsonData.name)}-${Date.now()}`,
    name: jsonData.name,
    cards: jsonData.cards,
    color: normalizeColor(data.color),
  };

  decks.push(newDeck);
  window.location.hash = `deck-view/${newDeck.id}`;
}

/*function createNewDeck(evt) {
  evt.preventDefault();

  const formData = new FormData(submitForm);
  const data = Object.fromEntries(formData.entries());
  const rawJson = data["data-json"];
  const parsedDeck = JSON.parse(rawJson);
  const slug = slugify(parsedDeck.title);
  const normalizedColor = normalizeColor(data.color);

  const newDeck = {
    normalizedColor,
    ...parsedDeck,
    slug,
  };
}*/

if (textarea && submitBtn && submitForm) {
  textarea.addEventListener("input", updateSubmitState);
  submitForm.addEventListener("submit", createNewDeck);
  updateSubmitState();
}

export { normalizeColor, slugify, createNewDeck, updateSubmitState };
