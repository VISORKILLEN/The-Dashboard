// Update clock every second
function updateClock() {
  const now = new Date();

  document.getElementById("time").innerText = now.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("date").innerText = now.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

setInterval(updateClock, 1000);
updateClock();

// -----------------------
// Dashboard title
const mainTitle = document.getElementById("main-title");

mainTitle.innerText = localStorage.getItem("dashTitle") || "John Doe Dashboard";

mainTitle.addEventListener("input", () => {
  localStorage.setItem("dashTitle", mainTitle.innerText);
});

// --------------------
// Quick links
const linkList = document.getElementById("link-list");

let savedLinks = JSON.parse(localStorage.getItem("myLinks")) || [];

function renderLinks() {
  linkList.innerHTML = "";

  savedLinks.forEach((link, index) => {
    const item = document.createElement("div");
    item.className = "link-item";

    const favicon = `https://www.google.com/s2/favicons?domain=${link.url}&sz=32`;

    item.innerHTML = `
      <img src="${favicon}" class="favicon">
      <a href="${link.url}" target="_blank">${link.title}</a>
      <button class="delete-btn" onclick="deleteLink(${index})">✕</button>
    `;

    linkList.appendChild(item);
  });
}

// Add link
document.getElementById("add-link-btn").addEventListener("click", () => {
  const title = prompt("Link title:");
  const url = prompt("URL (ex https://google.com)");

  if (title && url) {
    savedLinks.push({ title, url });

    localStorage.setItem("myLinks", JSON.stringify(savedLinks));

    renderLinks();
  }
});

// Delete link
window.deleteLink = (i) => {
  savedLinks.splice(i, 1);

  localStorage.setItem("myLinks", JSON.stringify(savedLinks));

  renderLinks();
};

renderLinks();

// ----------------------
// Weather code to check today and next coming 2 days
const weatherConfig = {
  0: { text: "Sol", icon: "☀️" },
  1: { text: "Klart", icon: "🌤️" },
  2: { text: "Sol och moln", icon: "⛅" },
  3: { text: "Mulet", icon: "☁️" },
  61: { text: "Regn", icon: "🌧️" },
  63: { text: "Regn", icon: "🌧️" },
  71: { text: "Snö", icon: "❄️" },
  73: { text: "Snö", icon: "❄️" },
  default: { text: "Varierande", icon: "🌦️" },
};

navigator.geolocation.getCurrentPosition(
  function (pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weather_code&timezone=auto&forecast_days=3`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const daily = data.daily;
        let htmlContent = "";

        for (let i = 0; i < 3; i++) {
          const temp = Math.round(daily.temperature_2m_max[i]);
          const code = daily.weather.code[i];
          const weather = weatherConfig[code] || weatherConfig.default;

          // Date logic
          const dateObj = new Date(daily.time[i]);
          let dayLabel = new Intl.DateTimeFormat("sv-SE", {
            weekday: "long",
          }).format(dateObj);
          dayLabel = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1); // Capitalize

          if (i === 0) dayLabel = "Idag";
          if (i === 1) dayLabel = "Imorgon";

          htmlContent += `
            <div class="weather-row">
                <div class="weather-icon">${weather.icon}</div>
                <div class="weather-info">
                    <h4>${dayLabel}</h4> 
                    <div class="badge-row">
                        <span class="weather-badge">${temp > 0 ? "+" : ""}${temp}°C</span>
                        <span class="weather-badge">${weather.text}</span>
                    </div>
                </div>
            </div>
        `;
        }
        document.getElementById("weather-display").innerHTML = htmlContent;
      });
  },
  () => {
    document.getElementById("weather-display").innerText =
      "Tillåt platsinfo för att se väder.";
  },
);

//--------------------
// Random fun fact
function loadFact() {
  fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
    .then((res) => res.json())

    .then((data) => {
      document.getElementById("api-data-container").innerHTML =
        `<p>${data.text}</p>`;
    })

    .catch(() => {
      document.getElementById("api-data-container").innerText =
        "Could not load fact.";
    });
}

loadFact();

// ---------------------
// Notes
const notes = document.getElementById("notes");

notes.value = localStorage.getItem("myNotes") || "";

// Save notes
notes.addEventListener("input", () => {
  localStorage.setItem("myNotes", notes.value);
});

// ---------------------
// Change background image
const bgBtn = document.getElementById("change-bg-btn");

bgBtn.addEventListener("click", () => {
  const newUrl = `https://picsum.photos/1920/1080?random=${Math.random()}`;

  document.body.style.backgroundImage = `url('${newUrl}')`;

  localStorage.setItem("bgImage", newUrl);
});

// Load saved background
if (localStorage.getItem("bgImage")) {
  document.body.style.backgroundImage = `url('${localStorage.getItem("bgImage")}')`;
}
