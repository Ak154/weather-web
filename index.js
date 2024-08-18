let api_key = "";
let weatherApi_key = "";

let mapContainer = document.getElementById("mapContainer");

function addMap() {
  let city = document.querySelector("input").value;
  displayMap(city);
  displayWeatherData(city);
}

function displayMap(city) {
  iframe = document.createElement("iframe");
  iframe.src = `https://www.google.com/maps/embed/v1/place?q=${city}&key=${api_key}`;
  iframe.title = "Google map";

  mapContainer.append(iframe);
}

let displayWeatherData = async (city) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi_key}`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    let { lat, lon } = data.coord;
    let foreCastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApi_key}`
    );
    let foreCastData = await foreCastResponse.json();
    displayCityCurrWeather(data);
  } catch (error) {
    console.log(
      "Error in fetching geocode data & weather forecast details",
      error
    );
  }
};

let weatherForeCast = document.getElementById("weather-forecast");

let displayCityCurrWeather = (foreCastData) => {
  weatherForeCast.innerText = "";
  const dt = new Date(foreCastData.dt * 1000);

  const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
  const optionTime = { hour: '2-digit', minute: '2-digit', hour12: true }
  const formattedDate = dt.toLocaleDateString("en-GB", optionsDate);
  const formattedTime = dt.toLocaleTimeString("en-GB", optionTime);

  let div1 = document.createElement("div");

  let currD = document.createElement("p");
  currD.innerText = formattedDate;

  let currT = document.createElement("p");
  currT.innerText = formattedTime;

  let currCity = document.createElement("h2");
  currCity.innerText = foreCastData.name+",";

  let currCountry = document.createElement("h2");
  currCountry.innerText = foreCastData.sys.country;

  div1.append(currD, currT, currCity, currCountry);
  weatherForeCast.append(div1);

  let div2 = document.createElement("div");

  let iconImg = document.createElement("img");
  iconImg.setAttribute("src",`https://openweathermap.org/img/wn/${foreCastData.weather[0].icon}@2x.png`);
  iconImg.setAttribute("alt", "image")

  let currTemp = document.createElement("h2");
  currTemp.innerText = tempData(foreCastData.main.temp)+" °C";

  div2.append(iconImg, currTemp);

  weatherForeCast.append(div2);

  let div3 = document.createElement("div");

  let foreCastDh3 = document.createElement("h3");
  foreCastDh3.innerText = `Feels like ${tempData(foreCastData.main.temp)-1}. ${foreCastData.weather[0].description}.` 
  
  let sectionData = document.createElement("section");

  let p1 = document.createElement("p")
  p1.innerText = `Speed: ${foreCastData.wind.speed} m/s`;

  let p2 = document.createElement("p")
  p2.innerText = `Pressure: ${foreCastData.main.pressure} P`;

  let p3 = document.createElement("p")
  p3.innerText = `Humidity: ${foreCastData.main.humidity}%`;

  let p4 = document.createElement("p")
  p4.innerText = `High: ${tempData(foreCastData.main.temp_max)}`;

  let p5 = document.createElement("p")
  p5.innerText = `Low: ${tempData(foreCastData.main.temp_min)} `;

  let p6 = document.createElement("p")
  p6.innerText = `Visibility: ${(foreCastData.visibility/1000).toFixed(1)} km`

  sectionData.append(p1, p2, p3, p4, p5, p6);

  div3.append(foreCastDh3, sectionData);

  weatherForeCast.append(div3);


};

// Temperature convertor section

 function tempData(data){
    return Math.floor(data- 273.15);
 }

let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  let city = document.querySelector("input").value;
  mapContainer.innerText = "";
  displayMap(city);
  displayWeatherData(city);
});
