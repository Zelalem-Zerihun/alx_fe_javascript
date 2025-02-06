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
  // Optional: Display the category
  quoteDisplay.textContent += ` (Category: ${randomQuote.category})`;
}

newQuoteButton.addEventListener("click", showRandomQuote);
showRandomQuote(); // Display an initial quote

function createAddQuoteForm() {
  newQuoteForm.innerHTML = ""; // Clear previous form elements

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
  addButton.onclick = addQuote; // Attach the addQuote function
  newQuoteForm.appendChild(addButton);
}

addQuoteButton.addEventListener("click", () => {
  newQuoteForm.style.display = "block";
  createAddQuoteForm(); // Now calling the function, which uses createElement/appendChild
});

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText.trim() !== "" && newQuoteCategory.trim() !== "") {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    showRandomQuote();
    newQuoteForm.style.display = "none";
    newQuoteForm.innerHTML = ""; // Clear the form after adding
  } else {
    alert("Please enter both a quote and a category.");
  }
}
