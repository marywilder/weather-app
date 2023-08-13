

let autocomplete;
function initAutocomplete() {
   autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['geocode'],
            fields: ['place_id', 'geometry', 'name']
        }
    );
    autocomplete.addEventListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
        // user did not select a prediction; reset the input field
        document.getElementById('autocomplete').paceholder = 'Enter a place';
    } else {
        // display details about the valid place
        document.getElementById('details').innerHTML = place.name;
    }
   
}

const api = {
   key: "a5c56d64c87ec5836770d4443865fcb9",
   base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchbox.value);
        let city = document.querySelector('.location .city');
        city.innerText = searchbox.value;
        console.log(searchbox.value);
    }
}
function setDefault (city, country) {
    fetch(`${api.base}weather?q=${city},${country}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}
setDefault('New York', '840');


function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name},
    ${weather.sys.country}`;
    let now = new Date();
    let humidity = document.querySelector('.humidity');
    humidity.innerText = `humidity: ${weather.main.humidity}%`
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F<span>`;

    let weather_el = document.querySelector('.current .weather');
    let weather_details = document.querySelector('.weather-description');
    let weather_icon = document.querySelector('.weather-icon');
    weather_el.innerText = weather.weather[0].main;
    weather_details.innerText = weather.weather[0].description;
    

     if (weather_details.innerText == 'scattered clouds' || weather_details.innerText == 'few clouds') {
        weather_icon.style.backgroundImage = "url(./icons/partly-cloudy.png";
    }
    else if (weather_el.innerText === "Clouds") {
        weather_icon.style.backgroundImage = "url(./icons/clouds.png"
    } else if (weather_el.innerText === 'Clear' && weather.main.temp >= 87 ) {
        weather_icon.style.backgroundImage = "url(./icons/hot-day.png"
    } else if (weather_el.innerText === 'Rain') {
        weather_icon.style.backgroundImage = "url(./icons/rain.png"
    } else if (weather_el.innerText === 'Thunderstorm') {
        weather_icon.style.backgroundImage = "url(./icons/thunderstorm.png"
    } else if (weather_el.innerText === 'Drizzle') {
        weather_icon.style.backgroundImage = "url(./icons/drizzle.png"
    } else if (weather_el.innerText === 'Clear') {
        weather_icon.style.backgroundImage = "url(./icons/clear.png"
    } else if (weather_el.innerText === 'Snow') {
        weather_icon.style.backgroundImage = "url(./icons/snow.png"
    } else if (weather_el.innerText === 'Mist' || weather_el.innerText === 'Fog') {
        weather_icon.style.backgroundImage = "url(./icons/mist-fog.png"
    } else if (weather_el.innerText === 'Smoke'|| 'Ash') {
        weather_icon.style.backgroundImage = "url(./icons/smoke.png"
    } else if (weather_el.innerText === 'Haze') {
        weather_icon.style.backgroundImage = "url(./icons/haze.png"
    } else if (weather_el.innerText == 'Dust' || weather_el.innerText == 'Sand') {
        weather_icon.style.backgroundImage = "url(./icons/sand-dust.png"
    } else if (weather_el.innerText === 'Squall') {
        weather_icon.style.backgroundImage = "url(./icons/squall.png"
    } else if (weather_el.innerText === 'Tornado') {
        weather_icon.style.backgroundImage = "url(./icons/tornado.png"
    } 
    

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`
    
}

function dateBuilder (d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date}, ${month} ${year}`; 
}