import { generateModal } from "./modal.js";

const openModal = generateModal({
  modalEl: document.querySelector("#confirm-modal"),
  confirmBtnEl: document.querySelector(".modal__confirm-btn"),
  cancelBtnEl: document.querySelector(".modal__cancel-btn"),
  visibleClass: "modal_visible",
});

const galleryTemplateEL = document.querySelector("#gallery-template");
const galleryListEl = document.querySelector("#home .gallery__list");

/**
 * Creates a deck card element from the gallery template.
 *
 * @param {object} deck - The deck object containing name, color, cards, and _id.
 * @param {function} onDelete - Callback invoked with (deck, deckEl) when the delete button is confirmed.
 * @returns {HTMLElement} The cloned and populated deck card element.
 */
function createDeckEl(deck, onDelete) {
  const cloneEl = galleryTemplateEL.content
    .querySelector(".card")
    .cloneNode(true);

  const deckTitleEl = cloneEl.querySelector(".card__title");
  const deckCountEl = cloneEl.querySelector(".card__count");
  const deleteBtnEl = cloneEl.querySelector(".card__delete-btn");
  const deckLinkEl = cloneEl.querySelector(".card__link");

  deckLinkEl.href = `#deck-view/${deck._id}`;

  deckTitleEl.textContent = deck.name;
  deckCountEl.textContent = `${deck.cards.length} cards`;
  cloneEl.style.backgroundColor = deck.color || "#64d583";

  deleteBtnEl.addEventListener("click", () => {
    openModal(() => onDelete(deck, cloneEl));
  });

  return cloneEl;
}

/**
 * Creates a deck element and prepends it to the gallery list.
 *
 * @param {object} deck - The deck object to render.
 * @param {function} onDelete - Callback invoked with (deck, deckEl) when the delete button is confirmed.
 */
function renderDeckEl(deck, onDelete) {
  const deckEl = createDeckEl(deck, onDelete);
  galleryListEl.prepend(deckEl);
}

export { renderDeckEl };
