//openWeather API_key:44f3f042b99d66e616973eb34d9fd51c
//calling URL: api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}

const api_key = '44f3f042b99d66e616973eb34d9fd51c';
const unit = 'metric'
const url = 'https://api.openweathermap.org/data/2.5/weather';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const card = document.querySelector('.card');

form.addEventListener('submit', e => {
    e.preventDefault();

    let inputVal = input.value;

    //console.log(inputVal);
    getResults(inputVal);
})

function getResults(query) {

    let newUrl = `${url}?q=${query}&APPID=${api_key}&units=${unit}`;

    console.log(newUrl);

    fetch(newUrl)
        .then(response => {
            return response.json();
        })
        .then(displayResults)
        .catch(err => {
            console.log(err);
        });
}

function displayResults(data) {
    //console.log(data);
    let icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`;

    card.innerHTML = `
    <h2>${data.name} <sup class="country-code">${data.sys.country}</sup></h2>
		<h3>${data.weather[0].main}<span>Wind ${data.wind.speed}Kmph <span class="dot">•</span> Humidity ${data.main.humidity}%</span></h3>
		<h1>${Math.round(data.main.temp)}°</h1>
		<img src="${icon}" alt="${data.weather[0]["description"]} class="icon">
    `;
}