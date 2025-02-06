const quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only way to do great work is to love what you do.",
    category: "Inspiration",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    category: "Innovation",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    category: "Dreams",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    category: "Value",
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    category: "Doubt",
  },
  {
    text: "It always seems impossible until it's done.",
    category: "Possibility",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const newQuoteForm = document.getElementById("newQuoteForm");
const addQuoteButton = document.getElementById("addQuoteButton");
const exportButton = document.getElementById("exportQuotes");
const importFile = document.getElementById("importFile");

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `${randomQuote.text} (Category: ${randomQuote.category})`;
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

newQuoteButton.addEventListener("click", showRandomQuote);
showRandomQuote();

function createAddQuoteForm() {
  newQuoteForm.innerHTML = "";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";
  newQuoteForm.appendChild(textInput);

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";
  newQuoteForm.appendChild(categoryInput);

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;
  newQuoteForm.appendChild(addButton);
}

addQuoteButton.addEventListener("click", () => {
  newQuoteForm.style.display = "block";
  createAddQuoteForm();
});

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    showRandomQuote();
    newQuoteForm.style.display = "none";
    newQuoteForm.innerHTML = "";
  } else {
    alert("Please enter both a quote and a category.");
  }
}

exportButton.addEventListener("click", () => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(quotes));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "quotes.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
});

importFile.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } catch (error) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }
});
