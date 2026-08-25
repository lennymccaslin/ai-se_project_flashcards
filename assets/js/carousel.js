import { removeColorClasses, hexToString } from "./colors.js";

/**
 * Initializes and renders the carousel view for a given deck.
 *
 * @param {object} deck - The deck object containing name, color, and cards array.
 */
function renderCarouselView(deck) {
  let currentIndex = 0;
  let showingQuestion = true;
  const carouselEl = document.querySelector(".carousel");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  const flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");
  const carouselCardEl = carouselEl.querySelector(".carousel__card");
  const freshLeftBtn = leftBtn.cloneNode(true);
  const freshRightBtn = rightBtn.cloneNode(true);

  /**
   * Disables a carousel button by adding the disabled class and attribute.
   *
   * @param {HTMLButtonElement} buttonEl - The button element to disable.
   */
  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }

  /**
   * Enables a carousel button by removing the disabled class and attribute.
   *
   * @param {HTMLButtonElement} buttonEl - The button element to enable.
   */
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  /**
   * Updates the left and right arrow buttons based on the current card index.
   */
  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(freshLeftBtn);
    } else {
      enableButton(freshLeftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(freshRightBtn);
    } else {
      enableButton(freshRightBtn);
    }
  }

  /**
   * Returns the carousel title string showing the deck name and current card position.
   *
   * @param {object} deck - The deck object.
   * @param {number} currentIndex - The zero-based index of the current card.
   * @returns {string} A formatted title string, e.g. "Deck Name · 2/10".
   */
  function getCarouselTitleString(deck, currentIndex) {
    return `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
  }

  /**
   * Updates the carousel display to reflect the current card index and flip state.
   */
  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];
    const carouselTitleEl = document.querySelector(".carousel__title");
    const cardTextEl = carouselCardEl.querySelector(".carousel__card-text");
    const colorName = hexToString(deck.color);

    updateArrows();

    removeColorClasses(carouselCardEl);

    if (colorName) {
      carouselCardEl.classList.add(`carousel__card_color_${colorName}`);
    }

    carouselTitleEl.textContent = getCarouselTitleString(deck, currentIndex);

    if (showingQuestion === true) {
      cardTextEl.textContent = currentCard.question;
      carouselCardEl.classList.remove("carousel__card_color_white");
    } else {
      cardTextEl.textContent = currentCard.answer;
      carouselCardEl.classList.add("carousel__card_color_white");
    }
  }

  leftBtn.replaceWith(freshLeftBtn);
  rightBtn.replaceWith(freshRightBtn);

  freshRightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  });

  freshLeftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  updateDisplay();
}

export { renderCarouselView };
