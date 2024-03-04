const targetEl = document.getElementById("target");

const slotsHTML = `<div class="slots-main-container" id="app">
<div class="doors">
  <div class="door">
    <div class="boxes">
    </div>
  </div>
  <div class="door">
    <div class="boxes">
    </div>
  </div>
  <div class="door">
    <div class="boxes">
    </div>
  </div>
</div>

<div class="buttons">
  <button class="button" id="spinner"><div class="spinner-text">Spin</div></button>
  <button class="button" id="reseter" onclick="enableButton()"><div class="spinner-text">Reset</div></button>
</div>
</div>`;

const cardsHTML = `
<div class="card-container-main" id="app">
<div class="card-cost-text">Cost: $100</div>
    <div class="card-container-content">
        <div class="card-container">
            <div class="card-content-front"></div>
        </div>
        <div class="card-container">
            <div class="card-content-front"></div>
        </div>
        <div class="card-container">
            <div class="card-content-front"></div>
        </div>
    </div>
    <div class="buttons">
        <button class="button" id="cards-reset">Reset</button>
    </div>
</div>`;

var template = document.createElement("template");

function showContent(html, id) {
    console.log("Called")
    choseCard = false;

    if (targetEl) {
        targetEl.innerHTML = "";
    }
    template.innerHTML = html;
    let clone = template.content.cloneNode(true);
    document.body.insertBefore(clone, document.body.firstChild);

    let snippet = document.getElementById("app");
    targetEl.appendChild(snippet);

    if (id === "cards") {
        activateCards();
    } else if (id === "slots") {
        activateSlots();
    }
}

function enableButton() {
    var button = document.getElementById("spinner");
    button.disabled = false; // Enable the button
}

window.onload = function() {
    console.log("Window loaded");
    showContent(slotsHTML, 'slots');

};
