let btn = document.getElementById("searchBtn");
let container = document.querySelector(".container");
let weatherIcon = document.getElementById("weatherIcon");
let temperature = document.getElementById("temperValue");
let cityName = document.getElementById("CityName");
let humidity = document.getElementById("humidityVal");
let windSpeed = document.getElementById("windSpeedVal");
let visibility = document.getElementById("visibilityVal");
let dateAndTime = document.getElementById("time");
let description = document.getElementById("description");

btn.addEventListener("click", () => {
  let city = document.getElementById("searchInput").value.trim();
  if (city == "") {
    emptyInput();
    return;
  } else {
    const APIKey = "Your API KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ad3acbcd40595949a199fa4bab56af52`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod == "404") {
          cityNOTFound();
        } else if (data.cod == 200) {
          container.style.height = "27rem";

          switch (data.weather[0].main) {
            case "Rain":
              weatherIcon.src = "./images/rain.png";
              break;
            case "Clear":
              weatherIcon.src = "./images/clear.png";
              break;
            case "Clouds":
              weatherIcon.src = "./images/cloud.png";
              break;
            case "Mist":
              weatherIcon.src = "./images/mist.png";
              break;
            case "Snow":
              weatherIcon.src = "./images/snow.png";
              break;
          }

          temperature.innerHTML = Math.round(data.main.temp) + "<sup>°</sup>C";
          description.innerText = data.weather[0].description;
          cityName.innerHTML = cityName.innerHTML = data.name;
          humidity.innerHTML = data.main.humidity + "%";
          windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(1);
          visibility.innerHTML = (data.visibility / 1000).toFixed(1);
        }
      })
      .catch((error) => {
        console.log(error, data);
      });
  }
});

let emptyInput = function () {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "You must enter a city name!",
  });
};

let cityNOTFound = function () {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "City not found!",
  });
};
