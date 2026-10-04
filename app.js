// Demo data. Replace this array with Firebase Firestore
// operations when connecting the project to the cloud.
let items = [
    {
        name: "Black Calculator",
        type: "Lost",
        location: "Block A Classroom",
        date: "2026-09-28",
        contact: "student@example.com",
        description: "Scientific calculator with a small scratch on the cover."
    },
    {
        name: "USB Drive",
        type: "Found",
        location: "Computer Lab",
        date: "2026-09-30",
        contact: "lab@example.com",
        description: "16 GB black USB drive found near a computer."
    }
];

const itemForm = document.getElementById("itemForm");
const itemsContainer = document.getElementById("items");
const searchInput = document.getElementById("search");
const statusText = document.getElementById("status");

function displayItems(filter = "") {
    const query = filter.toLowerCase().trim();

    const filtered = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );

    itemsContainer.innerHTML = "";

    if (filtered.length === 0) {
        itemsContainer.innerHTML = "<p>No matching reports found.</p>";
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "item-card";

        card.innerHTML = `
            <span class="badge">${escapeHTML(item.type)}</span>
            <h3>${escapeHTML(item.name)}</h3>
            <p><strong>Location:</strong> ${escapeHTML(item.location)}</p>
            <p><strong>Date:</strong> ${escapeHTML(item.date)}</p>
            <p><strong>Description:</strong> ${escapeHTML(item.description)}</p>
            <p><strong>Contact:</strong> ${escapeHTML(item.contact)}</p>
        `;

        itemsContainer.appendChild(card);
    });
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

itemForm.addEventListener("submit", event => {
    event.preventDefault();

    const newItem = {
        name: document.getElementById("itemName").value,
        type: document.getElementById("itemType").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value,
        contact: document.getElementById("contact").value,
        description: document.getElementById("description").value
    };

    items.unshift(newItem);
    displayItems();
    itemForm.reset();
    statusText.textContent = "Item report added successfully.";
});

searchInput.addEventListener("input", event => {
    displayItems(event.target.value);
});

displayItems();
