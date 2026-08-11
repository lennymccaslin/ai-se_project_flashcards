import { decks, getDeckByID } from "./gallery.js";
import { stringToHex, hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deckview.js";
import { generateModal } from "./modal.js";

const homeSection = document.querySelector("#home");
const aboutSection = document.querySelector("#about");
const deckViewSection = document.querySelector("#deck-view");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");
const mainEl = document.querySelector(".page__main-content");

const sections = {
  home: homeSection,
  about: aboutSection,
  deckView: deckViewSection,
  notFound: notFoundSection,
  carousel: carouselSection,
};

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

function router() {
  const hash = window.location.hash.slice(1) || "home";
  mainEl.classList.remove("page__main-content_location_carousel");
  mainEl.classList.remove("page__main-content_location_home");

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
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
