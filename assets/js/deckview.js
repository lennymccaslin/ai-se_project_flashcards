import { generateModal } from "./modal.js";

const openModal = generateModal({
  modalEl: document.querySelector("#confirm-modal"),
  confirmBtnEl: document.querySelector(".modal__confirm-btn"),
  cancelBtnEl: document.querySelector(".modal__cancel-btn"),
  visibleClass: "modal_visible",
});

/**
 * Renders the deck view for a given deck, displaying all its cards and wiring up interactions.
 *
 * @param {object} deck - The deck object containing name, color, and cards array.
 */
export function renderDeckView(deck) {
  const homeSection = document.querySelector("#home");
  const aboutSection = document.querySelector("#about");
  const deckViewSection = document.querySelector("#deck-view");
  const notFoundSection = document.querySelector("#not-found");
  const carouselSection = document.querySelector("#carousel");

  const deckTitleEl = deckViewSection.querySelector(".gallery__title");
  const cardListEl = deckViewSection.querySelector(".gallery__list");
  const practiceBtn = deckViewSection.querySelector(".gallery__practice-btn");
  const cardTemplate = document.querySelector("#card-template");

  homeSection.style.display = "none";
  if (aboutSection) {
    aboutSection.style.display = "none";
  }
  deckViewSection.style.display = "flex";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";

  deckTitleEl.textContent = deck.name;

  const existingCards = cardListEl.querySelectorAll(".card");
  existingCards.forEach((card) => card.remove());

  deck.cards.forEach((card) => {
    const cloneEl = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardTitleEl = cloneEl.querySelector(".card__title");
    const flipBtn = cloneEl.querySelector(".card__flip-btn");
    const deleteBtn = cloneEl.querySelector(".card__delete-btn");

    cardTitleEl.textContent = card.question;
    cloneEl.style.backgroundColor = deck.color || "#64d583";

    let isFlipped = false;
    flipBtn.addEventListener("click", () => {
      isFlipped = !isFlipped;
      cardTitleEl.textContent = isFlipped ? card.answer : card.question;
      cloneEl.style.backgroundColor = isFlipped
        ? "#ffffff"
        : deck.color || "#64d583";
    });

    deleteBtn.addEventListener("click", () => {
      openModal(() => cloneEl.remove());
    });

    const newCardBtn = cardListEl.querySelector(".gallery__new-flashcard-btn");
    cardListEl.insertBefore(
      cloneEl,
      newCardBtn ? newCardBtn.closest("li") : null,
    );
  });

  practiceBtn.onclick = () => {
    window.location.hash = `#carousel/${deck._id}`;
  };
}
