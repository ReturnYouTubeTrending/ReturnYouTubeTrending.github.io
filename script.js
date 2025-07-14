const buttonContainer = document.getElementById("button-container");

const chromeImg = "chrome.png";
const firefoxImg = "firefox.png";
const safariImg = "safari.png";
const unknownImg = "unknown.png";

const chromeURL = "https://chromewebstore.google.com/detail/return-youtube-trending/apcbkpnopnnjaegbhnmcimmnlmmbolai";
const firefoxURL = "https://addons.mozilla.org/firefox/addon/return-youtube-trending";
const safariURL = "https://github.com/dr-sauce/returnyoutubetrending";
const unknownURL = "https://github.com/dr-sauce/returnyoutubetrending";

function detectBrowser() {
  const ua = navigator.userAgent;

  const isFirefox = ua.includes("Firefox");
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isChromium = ua.includes("Chrome") || ua.includes("Edg") || ua.includes("Chromium");

  if (isFirefox) {
    addButton(firefoxImg, firefoxURL);
    addButton(unknownImg, unknownURL);
  } else if (isSafari) {
    addButton(safariImg, safariURL);
    addButton(unknownImg, unknownURL);
  } else if (isChromium) {
    addButton(chromeImg, chromeURL);
    addButton(unknownImg, unknownURL);
  } else {
    addButton(unknownImg, unknownURL);
  }
}

function addButton(imgSrc, url) {
  const wrapper = document.createElement("a");
  wrapper.className = "button-wrapper";
  wrapper.href = url;
  wrapper.target = "_blank";
  wrapper.rel = "noopener noreferrer";

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = "Install Button";

  const overlay = document.createElement("div");
  overlay.className = "cooldown-overlay";

  // Robux-style hover animation
  wrapper.addEventListener("mouseenter", () => {
    overlay.style.transition = "width 0.4s ease-out";
    overlay.style.width = "100%";
  });

  wrapper.addEventListener("mouseleave", () => {
    overlay.style.transition = "width 0.4s ease-in";
    overlay.style.width = "0%";
  });

  // Unified click handler with press effect and mobile overlay rollback
  img.addEventListener("click", (e) => {
    e.preventDefault(); // prevent instant navigation

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const delay = isMobile ? 250 : 100;

    wrapper.classList.add("pressed");

    // Trigger overlay forward fill (if not already visible)
    overlay.style.transition = "width 0.4s ease-out";
    overlay.style.width = "100%";

    // Start rollback after press animation
    setTimeout(() => {
      // Reverse overlay animation
      overlay.style.transition = "width 0.4s ease-in";
      overlay.style.width = "0%";

      // Open link
      window.open(url, "_blank");
    }, delay);

    // Remove press scale after animation
    setTimeout(() => {
      wrapper.classList.remove("pressed");
    }, delay + 150);
  });

  wrapper.appendChild(img);
  wrapper.appendChild(overlay);
  buttonContainer.appendChild(wrapper);
}

function handleClick(wrapper, url, event) {
  // Add click scale animation
  wrapper.classList.add("clicked");

  // Open link immediately (or after short visual feedback)
  setTimeout(() => {
    const target = event.button === 1 ? "_blank" : "_self";
    window.open(url, target);
  }, 100); // match the scale timing

  // Remove the class after animation ends
  setTimeout(() => {
    wrapper.classList.remove("clicked");
  }, 200);
}

detectBrowser();

document.addEventListener('DOMContentLoaded', function () {
  const subtitles = [
    "It's time for Shorts to retire",
    'By 소씨'
  ];

  let subtitleIndex = 0;
  const subtitleElement = document.getElementById('subtitle');
  const FADE_DURATION = 1000;       // in milliseconds
  const DISPLAY_DURATION = 10000;   // visible time (no fade)

  function updateSubtitle() {
    // Start fade-out
    subtitleElement.classList.add('fade-out');

    setTimeout(() => {
      // Update text
      subtitleIndex = (subtitleIndex + 1) % subtitles.length;
      subtitleElement.textContent = subtitles[subtitleIndex];

      // Fade-in
      subtitleElement.classList.remove('fade-out');
    }, FADE_DURATION);
  }

  // Start interval
  setInterval(updateSubtitle, DISPLAY_DURATION + 2 * FADE_DURATION);
});