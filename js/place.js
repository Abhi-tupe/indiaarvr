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

      const questions = [
        "This AR webapp provides detailed information about the museum.",
        "This AR webapp provides the complete information about the museum.",
        "This AR webapp provides information that helps me during my visit to the museum.",
        "When I used this AR webapp, the setting was not bland.",
        "The setting really showed attention to design detail.",
        "The setting provided pleasure to my senses.",
        "Using this AR webapp enhances my visit to the museum.",
        "I find this AR webapp to be useful for my visit to the museum.",
        "Using this AR webapp adds to my experience of visiting the museum.",
        "Using this AR webapp can be fun.",
        "Using this AR webapp can be enjoyable.",
        "Using this AR webapp can be very entertaining.",
        "I find using this AR webapp to be enjoyable.",
        "I have fun when using this AR webapp.",
        "Using this AR webapp is entertaining in itself.",
        "I feel happy when I use this AR webapp.",
        "After using this AR webapp, the chance that I will adopt AR webapps to visit museums in the future is likely.",
        "...is certain.",
        "...is big.",
        "I experienced the virtual objects as being actually present in my physical environment.",
        "I perceived the virtual objects as being “here” with me.",
        "The virtual objects felt disconnected from my physical environment. (reverse-coded)",
        "I am concerned about the privacy of my information when using this AR webapp.",
        "Using this AR webapp could lead to negative consequences.",
        "I feel uncertain about the security of this AR webapp.",
        "This AR webapp allows me to interact with its features easily.",
        "I can control and manipulate the content in this AR webapp.",
        "The AR webapp responds quickly to my actions.",
        "The virtual objects and information presented by this AR webapp seem realistic in my environment.",
        "The AR content behaves in a way that matches my expectations of how things should work in the real world.",
        "The AR experience feels coherent and believable."
      ];

      const generateLikert = (index) => {
        return `
          <div class="rating">
            ${[1, 2, 3, 4, 5].map(n => `
              <label>
                <input type="radio" name="q${index}" value="${n}"> ${n}
              </label>
            `).join(' ')}
          </div>
        `;
      };

      const questionHtml = questions.map((q, i) => `
        <div class="feedback-question">
          <p><strong>Q${i + 1}:</strong> ${q}</p>
          ${generateLikert(i + 1)}
        </div>
      `).join('');

      const finalReview = `
        <div class="final-review">
          <h3>Do you think the content on this AR webapp is correct?</h3>
          <div class="review-buttons">
            <button onclick="submitReview('Strongly Agree')">Strongly Agree</button>
            <button onclick="submitReview('Agree')">Agree</button>
            <button onclick="submitReview('Neutral')">Neutral</button>
            <button onclick="submitReview('Disagree')">Disagree</button>
            <button onclick="submitReview('Strongly Disagree')">Strongly Disagree</button>
          </div>
        </div>
      `;

      document.getElementById("monumentDetails").innerHTML = `
        <div class="video-preview">
          <h3>360° View of ${monument.name}</h3>
          ${videoEmbed}
        </div>

        <div class="questionnaire">
          <h2>User Experience Feedback</h2>
          ${questionHtml}
          <div style="text-align:center; margin-top: 20px;">
            <button onclick="submitAllResponses()" style="
              background-color: #2196F3;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-size: 16px;
            ">Submit Feedback</button>
          </div>
        </div>

        ${finalReview}

        <div class="monument-header">
          <h1>${monument.name}</h1>
          <p class="description">${monument.description}</p>
        </div>
      `;
    });
});

function submitReview(choice) {
  alert(`You selected: ${choice}`);
}

function submitAllResponses() {
  const totalQuestions = document.querySelectorAll('.feedback-question').length;
  const answers = [];

  for (let i = 1; i <= totalQuestions; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      answers.push({ question: i, answer: selected.value });
    } else {
      alert(`Please answer question ${i} before submitting.`);
      return;
    }
  }

  console.log("User Responses:", answers);
  alert("Thank you for your feedback! Your responses have been recorded.");
}
