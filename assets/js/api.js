const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: "01a02c1f-85e7-76cc-a330-6d28abb23d72",
});

/**
 * Processes a fetch response, returning JSON on success or rejecting with the status code.
 *
 * @param {Response} res - The fetch Response object.
 * @returns {Promise<object>} A promise that resolves to the parsed JSON body.
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetches all decks from the API.
 *
 * @returns {Promise<object[]>} A promise that resolves to an array of deck objects.
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}

/**
 * Deletes a deck by its ID.
 *
 * @param {string} deckId - The unique identifier of the deck to delete.
 * @returns {Promise<object>} A promise that resolves when the deck is deleted.
 */
function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  }).then(processResponse);
}

/**
 * Adds a new deck via the API.
 *
 * @param {{ name: string, cards: object[], color: string }} deck - The deck data to submit.
 * @returns {Promise<object>} A promise that resolves to the newly created deck object.
 */
function addDeck({ name, cards, color }) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, cards, color }),
  }).then(processResponse);
}

export { getDecks, deleteDeck, addDeck };
