const buttonContainer = document.getElementById("button-container");

const chromeImg = "chrome.png";
const firefoxImg = "firefox.png";
const safariImg = "safari.png";
const unknownImg = "github.png";

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

  // Reveal only when loaded
  img.addEventListener("load", () => {
    wrapper.classList.add("loaded");
  });

  const overlay = document.createElement("div");
  overlay.className = "cooldown-overlay";

  // Hover animation
  wrapper.addEventListener("mouseenter", () => {
    overlay.style.transition = "width 0.4s ease-out";
    overlay.style.width = "100%";
  });

  wrapper.addEventListener("mouseleave", () => {
    overlay.style.transition = "width 0.4s ease-in";
    overlay.style.width = "0%";
    wrapper.classList.remove("pressed");
  });

  // Mouse down for all buttons (left, middle, right)
  wrapper.addEventListener("mousedown", (e) => {
    // Add pressed class
    wrapper.classList.add("pressed");

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const delay = isMobile ? 250 : 100;

    // Animate overlay forward fill
    overlay.style.transition = "width 0.4s ease-out";
    overlay.style.width = "100%";

    // For left-click only (button 0), prevent default and open manually
    if (e.button === 0) {
      setTimeout(() => {
        overlay.style.transition = "width 0.4s ease-in";
        overlay.style.width = "0%";
      }, delay);

      setTimeout(() => {
        wrapper.classList.remove("pressed");
      }, delay + 150);
    }

    // For middle-click, just let browser handle the default behavior
  });

  // Always remove pressed class after mouseup
  wrapper.addEventListener("mouseup", () => {
    wrapper.classList.remove("pressed");
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

// New code: show page only after full load (images, etc)
window.addEventListener('load', () => {
  document.body.classList.add('visible');
});
