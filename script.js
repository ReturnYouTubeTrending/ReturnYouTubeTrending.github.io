// Source by ChatGPT
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
    // addButton(safariImg, safariURL);
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

  const div = document.createElement("div");
  div.className = "button-image";
  div.style.backgroundImage = `url('${imgSrc}')`;
  div.setAttribute('draggable', 'false');
  wrapper.setAttribute('draggable', 'false');

  const overlay = document.createElement("div");
  overlay.className = "cooldown-overlay";

  wrapper.appendChild(div);
  wrapper.appendChild(overlay);
  buttonContainer.appendChild(wrapper);

  wrapper.addEventListener("mouseenter", () => {
    overlay.style.transition = "width 0.4s ease-out";
    overlay.style.width = "100%";
  });

  wrapper.addEventListener("mouseleave", () => {
    overlay.style.transition = "width 0.4s ease-in";
    overlay.style.width = "0%";
    wrapper.classList.remove("pressed");
  });

  wrapper.addEventListener("mousedown", (e) => {
    wrapper.classList.add("pressed");

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const delay = isMobile ? 250 : 100;

    overlay.style.transition = "width 0.4s ease-out";
    overlay.style.width = "100%";

    if (e.button === 0) {
      setTimeout(() => {
        overlay.style.transition = "width 0.4s ease-in";
        overlay.style.width = "0%";
      }, delay);

      setTimeout(() => {
        wrapper.classList.remove("pressed");
      }, delay + 150);
    }
  });

  wrapper.addEventListener("mouseup", () => {
    wrapper.classList.remove("pressed");
  });

  div.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

function handleClick(wrapper, url, event) {
  wrapper.classList.add("clicked");

  setTimeout(() => {
    const target = event.button === 1 ? "_blank" : "_self";
    window.open(url, target);
  }, 100);

  setTimeout(() => {
    wrapper.classList.remove("clicked");
  }, 200);
}

detectBrowser();

document.addEventListener('DOMContentLoaded', function () {
  const subtitles = [
    "It's time for Shorts to retire",
    "By 소씨"
  ];

  let subtitleIndex = 0;
  const subtitleElement = document.getElementById('subtitle');
  const FADE_DURATION = 1000;
  const DISPLAY_DURATION = 10000;

  function updateSubtitle() {
    subtitleElement.classList.add('fade-out');

    setTimeout(() => {
      subtitleIndex = (subtitleIndex + 1) % subtitles.length;
      subtitleElement.textContent = subtitles[subtitleIndex];
      subtitleElement.classList.remove('fade-out');
    }, FADE_DURATION);
  }

  setInterval(updateSubtitle, DISPLAY_DURATION + 2 * FADE_DURATION);
});

window.addEventListener('load', () => {
  document.body.classList.add('visible');
});
