// script.js
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
  // ... more initial quotes
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const newQuoteForm = document.getElementById("newQuoteForm");
const addQuoteButton = document.getElementById("addQuoteButton");

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex].text;
}

newQuoteButton.addEventListener("click", showRandomQuote);
showRandomQuote(); // Display initial quote

addQuoteButton.addEventListener("click", () => {
  newQuoteForm.style.display = "block";
  newQuoteForm.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
});

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText.trim() !== "" && newQuoteCategory.trim() !== "") {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    showRandomQuote(); // Optionally show the new quote immediately
    newQuoteForm.style.display = "none"; // Hide the form
    newQuoteForm.innerHTML = ""; // Clear the form
  } else {
    alert("Please enter both a quote and a category.");
  }
}
