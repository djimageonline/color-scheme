const middle = document.getElementById("middle");
const hexBottom = document.getElementById("hex-bottom");
const colorScheme = document.getElementById("color-scheme");
const colorPicker = document.getElementById("color-picker");
const submitBtn = document.getElementById("submit");
const clickedImg = document.getElementById("clicked-img");
let message = document.getElementById("message");

let colorScemeValue = ``;
let colorHexValue = ``;

submitBtn.addEventListener("submit", handleSubmit);

document.addEventListener("click", function (e) {
  if (e.target.src) {
    message.style.display = "initial";
    let dataElement = e.target.src;
    dataElement = `#${dataElement.slice(-6)}`;
    navigator.clipboard.writeText(dataElement);
    message.innerHTML = "-- Copied --";
    setTimeout(function () {
      message.innerHTML = "Click To Copy";
    }, 1000);
  }
});

function initialRender() {
  fetch(`https://www.thecolorapi.com/scheme?hex=F55A5A&mode=monochrome`)
    .then((res) => res.json())
    .then((data) => {
      data.colors.forEach((color) => {
        middle.innerHTML += `
        <img class="color-image" id="clicked-img" src="${color.image.bare}">`;
        hexBottom.innerHTML += `
        <p class="color-hex">${color.hex.value}</p>`;
      });
    });
}

initialRender();

function handleSubmit(event) {
  event.preventDefault();
  let colorHtml = "";
  let colorHexHtml = "";
  colorScemeValue = colorScheme.value;
  colorHexValue = colorPicker.value.substring(1);

  fetch(`https://www.thecolorapi.com/scheme?hex=${colorHexValue}&mode=${colorScemeValue}&count=5`)
    .then((res) => res.json())
    .then((data) => {
      data.colors.forEach((color) => {
        colorHtml += `
          <img class="color-image" data-hex=${color.hex.value} src="${color.image.bare}">`;
        colorHexHtml += `
          <p class="color-hex">${color.hex.value}</p>`;
      });
      render(colorHtml, colorHexHtml);
    });
}

function render(html, hexHtml) {
  middle.innerHTML = html;
  hexBottom.innerHTML = hexHtml;
}
