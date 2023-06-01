let cities = [];
let colors = [];

fetch("palette3.csv")
  .then((response) => response.text())
  .then((data) => {
    const rows = data.split("\n");
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].trim().split(";");
      cities.push(row[0]);
      colors.push(row.slice(1));
    }
    generatePalette();
  });

function generatePalette() {
  let cityIndex = Math.floor(Math.random() * cities.length);
  let cityColors = colors[cityIndex];
  let cityName = document.getElementById("city-name");
  let hexCode = document.querySelector(".hex-code");
  let palette = document.querySelector(".palette");

  cityName.innerHTML = cities[cityIndex];
  document.title = `colours of ${cities[cityIndex]}`;

  let colorsToDisplay = cityColors.length;
  let screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    colorsToDisplay = Math.ceil(cityColors.length / 2);
    cityName.style.fontSize = "5em";
    hexCode.style.fontSize = "1.5em";
  }

  for (let i = 0; i < colorsToDisplay; i++) {
    let element = document.createElement("div");
    element.classList.add("color");
    element.style.backgroundColor = cityColors[i];

    // Add event listener to display hex code on hover
    element.addEventListener("mouseover", () => {
      hexCode.innerHTML = cityColors[i];
      element.addEventListener("click", () => {
        navigator.clipboard.writeText(cityColors[i]);
        hexCode.innerHTML = "Code copied!";
        setTimeout(() => {
          hexCode.innerHTML = cityColors[i];
        }, 1000);
        element.classList.add("clicked");
        setTimeout(() => {
          element.classList.remove("clicked");
        }, 200);
      });
    });

    // Remove hex code on mouseout
    element.addEventListener("mouseout", () => {
      hexCode.innerHTML = "";
    });

    palette.appendChild(element);
  }
}
