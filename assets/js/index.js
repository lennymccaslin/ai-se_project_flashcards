import { renderDeckEl } from "./gallery.js";
import { stringToHex, hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deckview.js";
import { generateModal } from "./modal.js";
import * as newDeckView from "./new-deck-view.js";
import { deleteDeck, getDecks } from "./api.js";
import { fetchedDecks, getDeckByID } from "./decks.js";

const homeSection = document.querySelector("#home");
const aboutSection = document.querySelector("#about");
const deckViewSection = document.querySelector("#deck-view");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");
const newDeckSection = document.querySelector("#new-deck-view");
const mainEl = document.querySelector(".page__main-content");

const sections = {
  home: homeSection,
  about: aboutSection,
  deckView: deckViewSection,
  notFound: notFoundSection,
  carousel: carouselSection,
  newDeckView: newDeckSection,
};

function handleDeleteDeck(deck, deckEl) {
  deleteDeck(deck._id)
    .then(() => {
      deckEl.remove();

      const deckIndex = fetchedDecks.findIndex(
        (fetchedDeck) => fetchedDeck._id === deck._id,
      );

      if (deckIndex !== -1) {
        fetchedDecks.splice(deckIndex, 1);
      }
    })
    .catch((error) => {
      console.error("Error deleting deck:", error);
    });
}

function showView(currentSection, displayValue = "flex") {
  Object.entries(sections).forEach(([key, el]) => {
    if (el) el.style.display = key === currentSection ? displayValue : "none";
  });

  if (currentSection === "carousel") {
    document.body.classList.add("page_view_carousel");
  } else {
    document.body.classList.remove("page_view_carousel");
  }
}

function renderHomeView() {
  showView("home", "flex");
  getDecks()
    .then((decks) => {
      fetchedDecks.push(...decks);
      decks.forEach((deck) => renderDeckEl(deck, handleDeleteDeck));
    })
    .catch(() => {
      showError("Error fetching decks");
    });
}

function renderNotFoundView() {
  showView("notFound", "flex");
}

function renderAboutView() {
  if (aboutSection) {
    showView("about", "block");
  } else {
    renderNotFoundView();
  }
}

function renderNewDeckView() {
  showView("newDeckView", "flex");
}

function router() {
  const hash = window.location.hash.slice(1) || "home";
  mainEl.classList.remove("page__main-content_location_carousel");
  mainEl.classList.remove("page__main-content_location_home");
  mainEl.classList.remove("page__main-content_location_new-deck-view");

  if (hash === "home" || hash === "") {
    renderHomeView();
    mainEl.classList.add("page__main-content_location_home");
  } else if (hash === "about") {
    renderAboutView();
  } else if (hash.startsWith("deck-view/")) {
    const deckId = hash.replace("deck-view/", "");
    const deck = getDeckByID(deckId);

    if (deck) {
      renderDeckView(deck);
      newDeckSection.style.display = "none";
    } else {
      renderNotFoundView();
    }
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.replace("carousel/", "");
    const deck = getDeckByID(deckId);

    if (deck) {
      renderCarouselView(deck);
      showView("carousel", "grid");
      mainEl.classList.add("page__main-content_location_carousel");
    } else {
      renderNotFoundView();
    }
  } else if (hash === "new-deck-view") {
    renderNewDeckView();
    mainEl.classList.add("page__main-content_location_new-deck-view");
  } else {
    renderNotFoundView();
  }
}

document
  .querySelector("#home .gallery__new-card-btn")
  .addEventListener("click", () => {
    window.location.hash = "new-deck-view";
  });
window.addEventListener("DOMContentLoaded", (event) => {
  getDecks()
    .then((decks) => {
      decks.forEach((deck) => renderDeckEl(deck, handleDeleteDeck));
    })
    .catch(() => {
      newDeckView.showError(error.message || error);
    })
    .finally(() => {
      router();
    });
});
window.addEventListener("hashchange", router);
