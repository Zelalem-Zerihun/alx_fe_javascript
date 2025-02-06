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
  newQuoteForm.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
}

addQuoteButton.addEventListener("click", () => {
  newQuoteForm.style.display = "block";
  createAddQuoteForm(); // Now calling the function
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
