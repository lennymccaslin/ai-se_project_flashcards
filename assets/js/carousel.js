import { removeColorClasses, hexToString } from "./colors.js";

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

  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }

  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

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

  function getCarouselTitleString(deck, currentIndex) {
    return `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
  }

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
