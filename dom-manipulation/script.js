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
const exportQuotesButton = document.getElementById("exportQuotes");
const importFileInput = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");

function showRandomQuote() {
  const filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for the selected category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
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
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText.trim() !== "" && newQuoteCategory.trim() !== "") {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();
    showRandomQuote();
    newQuoteForm.style.display = "none";
    newQuoteForm.innerHTML = "";
  } else {
    alert("Please enter both a quote and a category.");
  }
}

function populateCategories() {
  const categories = ["all", ...new Set(quotes.map((q) => q.category))];
  categoryFilter.innerHTML = categories
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join("\n");
  categoryFilter.value = localStorage.getItem("selectedCategory") || "all";
}

function getFilteredQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  return selectedCategory === "all"
    ? quotes
    : quotes.filter((q) => q.category === selectedCategory);
}

categoryFilter.addEventListener("change", () => {
  showRandomQuote();
});

populateCategories();

exportQuotesButton.addEventListener("click", () => {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

importFileInput.addEventListener("change", (event) => {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (e) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
});

function filterQuotes() {
  showRandomQuote();
}
