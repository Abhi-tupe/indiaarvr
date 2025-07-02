document.addEventListener("DOMContentLoaded", () => {
  const monumentName = localStorage.getItem("selectedPlace");

  if (!monumentName) {
    alert("No monument selected. Redirecting...");
    window.location.href = "monuments.html";
    return;
  }

  fetch("data/monuments.json")
    .then(res => res.json())
    .then(data => {
      const monument = data.find(m => m.name === monumentName);
      if (!monument) {
        document.getElementById("monumentDetails").innerHTML = "<p>Monument not found.</p>";
        return;
      }

      const videoEmbed = monument.videoUrl
        ? `<iframe width="100%" height="360"
              src="${monument.videoUrl}"
              title="${monument.name} 360 Preview"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
           </iframe>`
        : `<p>No video available for this monument.</p>`;

      document.getElementById("monumentDetails").innerHTML = `
        <div class="video-preview">
          <h3>360° View of ${monument.name}</h3>
          ${videoEmbed}
        </div>

        <div class="review-section" style="text-align: center; margin-top: 30px;">
          <h3>Review this Monument</h3>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd6tRuZffcuJub9THbSWMiPQ-T5DCJYRxfPUbrnexCJloplGQ/viewform?usp=sf_link" target="_blank">
            <button style="
              padding: 12px 24px;
              font-size: 16px;
              background-color: #4CAF50;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
            ">Review Monument</button>
          </a>
        </div>

        <div class="monument-header">
          <h1>${monument.name}</h1>
          <p class="description">${monument.description}</p>
        </div>
      `;
    });
});
