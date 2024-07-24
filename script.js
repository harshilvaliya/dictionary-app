const inputElement = document.getElementById("wordInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("resultsContainer");
const appTitle = document.getElementById("appTitle");

/**
 * Fetches word data from the dictionary API.
 * @param {string} word - The word to search for.
 * @returns {Promise<Object>} - The word data.
 */
async function fetchWordData(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) {
      throw new Error("Word not found");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(error);
    alert("Error fetching the word's data. Please try again.");
    return null;
  }
}

/**
 * Handles search button click and Enter key press.
 */
function handleSearch() {
  const word = inputElement.value.trim();
  if (!word) {
    alert("Please enter a word.");
    return;
  }
  displayWordData(word);
}

/**
 * Fetches and displays word data.
 * @param {string} word - The word to search for.
 */
async function displayWordData(word) {
  const data = await fetchWordData(word);
  if (!data) return;

  const partsOfSpeech = data.meanings.map((meaning) => meaning.partOfSpeech);

  resultsContainer.innerHTML = `
    <div class="result-card">
      <div class="property">
        <span>Word:</span>
        <span>${data.word}</span>
      </div>
      <div class="property">
        <span>Phonetic:</span>
        <span>${data.phonetic || "N/A"}</span>
      </div>
      <div class="property">
        <span>Audio:</span>
        <span>
          ${
            data.phonetics[0]?.audio
              ? `<audio controls src="${data.phonetics[0].audio}"></audio>`
              : "N/A"
          }
        </span>
      </div>
      <div class="property">
        <span>Definition:</span>
        <span>${data.meanings[0].definitions[0].definition}</span>
      </div>
      <div class="property">
        <span>Example:</span>
        <span>${data.meanings[0].definitions[0].example || "N/A"}</span>
      </div>
      <div class="property">
        <span>Parts of Speech:</span>
        <span>${partsOfSpeech.join(", ")}</span>
      </div>
    </div>`;
}

// Event listeners
searchButton.addEventListener("click", handleSearch);
inputElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
appTitle.addEventListener("click", () => {
  location.reload();
});
