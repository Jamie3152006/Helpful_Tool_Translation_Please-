let wordMap = {};

const url = chrome.runtime.getURL("words.json");
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    wordMap = data;
    const fontUrl = chrome.runtime.getURL("fonts/chineseFont2.otf");

    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: "customFont";
        src: url("${fontUrl}") format("truetype");
      }

      #pop-up-mandarin {
        font-family: "customFont", sans-serif;
      }
    `;
    document.head.appendChild(style);
    createPopup();
    highlightWords(document.body);
  });

function createPopup() {
  const overlay = document.createElement("div");
  overlay.id = "pop-up-overlay";
  overlay.addEventListener("click", closePopup);

  const popup = document.createElement("div");
  popup.id = "pop-up";
  popup.innerHTML = `
    <div id="pop-up-left">
        <h4 id="pop-up-word"></h4>
        <img id="pop-up-img" style="width: 50%; border-radius: 6px; margin: 8px 0;" />
        <p id="pop-up-definition"></p>
        <button id="pop-up-close-btn">Close</button>
    </div>
    <div id="pop-up-right">
        <p id="pop-up-mandarin"></p>
        <p id="pop-up-mandarin-text"></p>
        <img id="pop-up-icon" />
    </div>
`;
  popup
    .querySelector("#pop-up-close-btn")
    .addEventListener("click", closePopup);

  document.body.appendChild(overlay);
  document.body.appendChild(popup);
}

function highlightWords(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    let lowerText = text.toLowerCase();
    let newHTML = text;
    let match = false;

    Object.keys(wordMap).forEach((phrase) => {
        const lowerPhrase = phrase.toLowerCase();
      if (newHTML.includes(phrase)) {
        match = true;
        newHTML = newHTML
          .split(phrase)
          .join(
            `<span class="highlight" data-word="${phrase}">${phrase}</span>`,
          );
      }
    });

    if (match) {
      const span = document.createElement("span");
      span.innerHTML = newHTML;
      span.querySelectorAll(".highlight").forEach((el) => {
        el.addEventListener("click", () => openPopup(el.dataset.word));
      });
      node.replaceWith(span);
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.tagName === "SCRIPT" || node.tagName === "STYLE") return;
    [...node.childNodes].forEach((child) => highlightWords(child));
  }
}

function openPopup(word) {
  const info = wordMap[word];
  const imgUrl = chrome.runtime.getURL(info.image);
  const popup = document.getElementById("pop-up");
  popup.style.backgroundImage = `url("${imgUrl}")`;
  popup.style.backgroundSize = "cover";
  popup.style.backgroundPosition = "center";
  document.getElementById("pop-up-word").textContent = info.title;
  document.getElementById("pop-up-word").style.color = info.color;
  document.getElementById("pop-up-definition").textContent = info.description;
  document.getElementById("pop-up-mandarin").textContent = info.mandarin;
  document.getElementById("pop-up-mandarin-text").textContent = info.mandarinText;
  const iconEl = document.getElementById("pop-up-icon");
  iconEl.src = chrome.runtime.getURL(info.icon);
  popup.style.display = "flex";
  //   document.getElementById("pop-up-img").src = chrome.runtime.getURL(info.image);
  //   document.getElementById("pop-up").style.display = "flex";
  document.getElementById("pop-up-overlay").style.display = "block";
}

function closePopup() {
  document.getElementById("pop-up").style.display = "none";
  document.getElementById("pop-up-overlay").style.display = "none";
}
