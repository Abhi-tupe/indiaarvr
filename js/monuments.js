document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const state = user?.state;

  if (!state) {
    alert("State not found. Redirecting...");
    window.location.href = "index.html";
    return;
  }

  fetch("data/monuments.json")
    .then(res => res.json())
    .then(monuments => {
      const filtered = monuments.filter(m => m.state.toLowerCase() === state.toLowerCase());
      const container = document.getElementById("monumentList");

      if (filtered.length === 0) {
        container.innerHTML = `<p>No monuments found for <strong>${state}</strong>.</p>`;
        return;
      }

      filtered.forEach(monument => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="assets/images/${monument.image}" alt="${monument.name}">
          <div class="card-content">
            <h3>${monument.name}</h3>
            <p>${monument.description}</p>
            <button onclick="goToPlace('${monument.name}')">View More</button>
          </div>
        `;
        container.appendChild(card);
      });
    });

});

function goToPlace(name) {
  localStorage.setItem("selectedPlace", name);
  window.location.href = "place.html";
}
