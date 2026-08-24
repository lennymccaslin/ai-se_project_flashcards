import { generateModal } from "./modal.js";

const openModal = generateModal({
  modalEl: document.querySelector("#confirm-modal"),
  confirmBtnEl: document.querySelector(".modal__confirm-btn"),
  cancelBtnEl: document.querySelector(".modal__cancel-btn"),
  visibleClass: "modal_visible",
});

const galleryTemplateEL = document.querySelector("#gallery-template");
const galleryListEl = document.querySelector("#home .gallery__list");

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

function renderDeckEl(deck, onDelete) {
  const deckEl = createDeckEl(deck, onDelete);
  galleryListEl.prepend(deckEl);
}

export { renderDeckEl };
