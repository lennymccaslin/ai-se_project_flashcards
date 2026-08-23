const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: "01a02c1f-85e7-76cc-a330-6d28abb23d72",
});

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}

export { getDecks };
