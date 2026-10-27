const form = document.querySelector("#search-form");
const textInput = document.querySelector("#source-text");
const termInput = document.querySelector("#search-term");
const replacementInput = document.querySelector("#replacement-term");
const replaceButton = document.querySelector("#replace-button");
const clearButton = document.querySelector("#clear-button");
const characterCount = document.querySelector("#character-count");
const alertMessage = document.querySelector("#alert-message");
const results = document.querySelector("#results");
const resultsTitle = document.querySelector("#results-title");
const resultCount = document.querySelector("#result-count");
const resultLabel = document.querySelector("#result-label");
const processedText = document.querySelector("#processed-text");

let alertTimeout;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createMatcher(term) {
  return new RegExp(escapeRegExp(term), "giu");
}

function showAlert(message, type = "error") {
  window.clearTimeout(alertTimeout);
  alertMessage.textContent = message;
  alertMessage.className = `alert alert-${type}`;
  alertMessage.hidden = false;
  alertTimeout = window.setTimeout(() => {
    alertMessage.hidden = true;
  }, 4500);
}

function renderMatches(text, matcher) {
  processedText.replaceChildren();
  let lastIndex = 0;
  let match;
  let count = 0;

  while ((match = matcher.exec(text)) !== null) {
    processedText.append(document.createTextNode(text.slice(lastIndex, match.index)));

    const highlightedMatch = document.createElement("mark");
    highlightedMatch.className = "highlight";
    highlightedMatch.textContent = match[0];
    processedText.append(highlightedMatch);

    lastIndex = match.index + match[0].length;
    count += 1;
  }

  processedText.append(document.createTextNode(text.slice(lastIndex)));
  return count;
}

function renderReplacements(text, matcher, replacement) {
  processedText.replaceChildren();
  let lastIndex = 0;
  let match;
  let count = 0;

  while ((match = matcher.exec(text)) !== null) {
    processedText.append(document.createTextNode(text.slice(lastIndex, match.index)));

    const replacedMatch = document.createElement("mark");
    replacedMatch.className = "highlight";
    replacedMatch.textContent = replacement;
    processedText.append(replacedMatch);

    lastIndex = match.index + match[0].length;
    count += 1;
  }

  processedText.append(document.createTextNode(text.slice(lastIndex)));
  return count;
}

function updateCharacterCount() {
  const count = textInput.value.length;
  characterCount.textContent = `${count.toLocaleString("es")} ${
    count === 1 ? "carácter" : "caracteres"
  }`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = textInput.value;
  const term = termInput.value.trim();

  if (!text.trim()) {
    showAlert("Escribe o pega un texto antes de realizar la búsqueda.");
    textInput.focus();
    return;
  }

  if (!term) {
    showAlert("Escribe la palabra o el carácter que quieres encontrar.");
    termInput.focus();
    return;
  }

  const count = renderMatches(text, createMatcher(term));
  resultsTitle.textContent = "Tu texto, con lo importante resaltado";
  resultCount.textContent = count.toLocaleString("es");
  resultLabel.textContent = count === 1 ? "vez encontrada" : "veces encontradas";
  results.hidden = false;
  alertMessage.hidden = true;

  if (count === 0) {
    showAlert(`No encontramos “${term}” en el texto.`, "info");
  } else {
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

replaceButton.addEventListener("click", () => {
  const text = textInput.value;
  const term = termInput.value.trim();
  const replacement = replacementInput.value.trim();

  if (!text.trim()) {
    showAlert("Escribe o pega un texto antes de realizar el reemplazo.");
    textInput.focus();
    return;
  }

  if (!term) {
    showAlert("Escribe la palabra o el carácter que quieres reemplazar.");
    termInput.focus();
    return;
  }

  if (!replacement) {
    showAlert("Escribe la palabra nueva para realizar el reemplazo.");
    replacementInput.focus();
    return;
  }

  const count = renderReplacements(text, createMatcher(term), replacement);
  textInput.value = text.replace(createMatcher(term), () => replacement);
  updateCharacterCount();
  resultsTitle.textContent = "Texto actualizado con los reemplazos";
  resultCount.textContent = count.toLocaleString("es");
  resultLabel.textContent = count === 1 ? "reemplazo realizado" : "reemplazos realizados";
  results.hidden = false;
  alertMessage.hidden = true;

  if (count === 0) {
    showAlert(`No encontramos “${term}” en el texto.`, "info");
  } else {
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

textInput.addEventListener("input", updateCharacterCount);

clearButton.addEventListener("click", () => {
  form.reset();
  updateCharacterCount();
  results.hidden = true;
  alertMessage.hidden = true;
  processedText.replaceChildren();
  window.clearTimeout(alertTimeout);
  textInput.focus();
});
