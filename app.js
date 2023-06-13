// Fetch and parse JSON data from decks.json
function fetchDecks() {
  return fetch("decks.json")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching decks:", error));
}

// Create colored squares for a given color code
function createColorSquare(colorCode) {
  const square = document.createElement("div");
  square.className = "color-square";
  square.style.backgroundColor = colorCode;
  return square;
}

// Create table row elements for each deck
function createDeckRow(deck) {
  const row = document.createElement("tr");

  const name = document.createElement("td");
  name.textContent = deck.name;

  const color = document.createElement("td");

  // Replace color names with corresponding color codes
  const colorCodes = {
    "White": "#f0eebd",
    "Blue": "#9bc6db",
    "Black": "#6d6b6d",
    "Red": "#f17268",
    "Green": "#8cad6a"
  };

  // Split the deck colors by both the "and" keyword and spaces
  const colors = deck.colors.split(/(?:\sand\s)|\s+/);
  colors.forEach((colorName) => {
    colorName = colorName.trim();
    if (colorCodes[colorName]) {
      const square = createColorSquare(colorCodes[colorName]);
      color.appendChild(square);
    }
  });

  const purchaseStatus = document.createElement("td");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = JSON.parse(localStorage.getItem(deck.name) || "false");
  checkBox.addEventListener("change", () => {
    localStorage.setItem(deck.name, checkBox.checked);
    if (checkBox.checked) {
      row.classList.add("purchased");
    } else {
      row.classList.remove("purchased");
    }
  });

  purchaseStatus.appendChild(checkBox);
  row.appendChild(name);
  row.appendChild(color);
  row.appendChild(purchaseStatus);

  if (checkBox.checked) {
    row.classList.add("purchased");
  }

  return row;
}

// Populate the table with deck information
function populateTable() {
  const table = document.querySelector("tbody");

  fetchDecks()
    .then((decks) => {
      decks.forEach((deck) => {
        const row = createDeckRow(deck);
        table.appendChild(row);
      });
    })
    .catch((error) => console.error("Error populating table:", error));
}

// Execute the populateTable function on page load
populateTable();
