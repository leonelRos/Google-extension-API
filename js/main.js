// function clock() {
//     let today = new Date(),
//         h = today.getHours(),
//         m = today.getMinutes(),
//         s = today.getSeconds();

//     document.querySelectorAll('.txt')[0].innerHTML = checktime(h) + ":" + checktime(m) + ":" + checktime(s);

//     //this function is adding a "0" in front of numbers < 10
//     function checktime(i) {
//         if (i < 10) {
//             i = "0" + i;
//         }
//         return i;
//     }
// }
// setInterval(clock, 500);

/*HERE IS THE CODE FOR THE WEATHER WIDGET
 */

const iconWeather = document.querySelector(".weather-icon");
const tempWeather = document.querySelector(".temperature-value p");
const descWeather = document.querySelector(".temperature-description p ");
const locationWeather = document.querySelector(".location p");
const notiWeather = document.querySelector(".notification");

let weather = {};
weather.temperature = {
  unit: "celcius",
};

let KELVIN = 273;

let key = "64f8c4f70c4714abdec8a659fded47eb";
//check user browser location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notiWeather.style.display = "block";
  notiWeather.innerHTML = "<p>Browser does not support geolocation</p> ";
}

//check user location
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

//if there is an issue with geolocation service
function showError(error) {
  notiWeather.style.display = "block";
  notiWeather.innerHTML = `<p> ${error.message}</p>`;
}

//getting the data from API
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  //using fetch with promises
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      //calling parameters in the API
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

//display weather to UI
function displayWeather() {
  iconWeather.innerHTML = `<img src="/icons/${weather.iconId}.png"/>`;
  tempWeather.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descWeather.innerHTML = weather.description;
  locationWeather.innerHTML = `${weather.city}, ${weather.country}`;
}

// convert C to F
function celciusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32; //this is the formula to convert
}

//onclick siwtch from celsius to fahrenheit
tempWeather.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celciusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempWeather.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempWeather.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});

//here ends the code for the weather app.

setInterval(setClock, 1000);

const dataHour = document.querySelector("[data-hour-hand]");
const dataMinute = document.querySelector("[data-minute-hand]");
const dataSecond = document.querySelector("[data-second-hand]");
const greetings = document.querySelector("[data-greeting]");
const name = document.querySelector("[data-name]");
const message = document.querySelector("[data-message]");

function setClock() {
  var currentDate = new Date();
  var secondsRatio = currentDate.getSeconds() / 60; //divide by 60 because there are 60 seconds in a minute
  var minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60; //60 seconds in one minute
  var hourRatio = (minutesRatio + currentDate.getHours()) / 12; // only 12 hours
  setRotation(dataSecond, secondsRatio);
  setRotation(dataMinute, minutesRatio);
  setRotation(dataHour, hourRatio);
}
//this function allows the handles to roatte using
//(--rotation frm css to 360 degrees)
function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

function setBackImage(n) {
  let today = new Date();
  let hour = today.getHours();

  if (hour < 12) {
    //morning
    document.body.style.backgroundImage = "url('./img/morning-1.jpg')";
    greetings.textContent = "Good Morning";
  } else if (hour < 18) {
    //afternoon
    document.body.style.backgroundImage = "url('./img/afternoon-1.jpg')";
    greetings.textContent = "Good Afternoon";
    document.body.style.color = "aliceblue";
  } else {
    //evening
    document.body.style.backgroundImage = "url('./img/night-2.jpeg')";
    // document.body.style.backgroundImage = "url('./img/afternoon-1.jpg')";
    greetings.textContent = "Good Evening";
    document.body.style.color = "antiquewhite";
  }
}
//get name
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "____";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function setName(e) {
  if (e.type === "keypress") {
    //make sure ENTER  is pressed
    if (e.which == 13 || e.keyCode == 13) {
      //13 == key code ENTER || since is deprecated we use both which and keycode for browsers
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText); //we use the target prop to target specific item name
  }
}

//get message
function getMessage() {
  if (localStorage.getItem("message") === null) {
    message.textContent = "____";
  } else {
    message.textContent = localStorage.getItem("message");
  }
}

function setMessage(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("message", e.target.innerText);
      message.blur();
    }
  } else {
    localStorage.setItem("message", e.target.innerText);
  }
}

//adding event listeners
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
message.addEventListener("keypress", setMessage);
message.addEventListener("blur", setMessage);

setClock();
setBackImage();
getName();
getMessage();
setName();
setMessage();
