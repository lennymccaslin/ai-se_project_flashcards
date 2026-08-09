import { decks, getDeckByID } from "./gallery.js";
import { stringToHex, hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deckview.js";

const homeSection = document.querySelector("#home");
const aboutSection = document.querySelector("#about");
const deckViewSection = document.querySelector("#deck-view");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");
const mainEl = document.querySelector(".page__main-content");

function renderHomeView() {
  homeSection.style.display = "flex";
  if (aboutSection) {
    aboutSection.style.display = "none";
  }
  deckViewSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  if (aboutSection) {
    aboutSection.style.display = "none";
  }
  deckViewSection.style.display = "none";
  notFoundSection.style.display = "flex";
  carouselSection.style.display = "none";
}

function renderAboutView() {
  const aboutEl = document.querySelector("#about");

  if (aboutEl) {
    homeSection.style.display = "none";
    aboutEl.style.display = "block";
    deckViewSection.style.display = "none";
    notFoundSection.style.display = "none";
    carouselSection.style.display = "none";
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
      homeSection.style.display = "none";
      if (aboutSection) {
        aboutSection.style.display = "none";
      }
      deckViewSection.style.display = "none";
      notFoundSection.style.display = "none";
      renderCarouselView(deck);
      mainEl.classList.add("page__main-content_location_carousel");
      carouselSection.style.display = "grid";
    } else {
      renderNotFoundView();
    }
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
