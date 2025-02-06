const quotes = [
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

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = randomQuote.text;
  quoteDisplay.textContent += ` (Category: ${randomQuote.category})`;
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
    showRandomQuote();
    newQuoteForm.style.display = "none";
    newQuoteForm.innerHTML = "";
  } else {
    alert("Please enter both a quote and a category.");
  }
}
