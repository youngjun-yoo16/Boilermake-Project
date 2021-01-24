//openWeather API_key:44f3f042b99d66e616973eb34d9fd51c
//calling URL: api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}

const api_key = '44f3f042b99d66e616973eb34d9fd51c';
const unit = 'metric'
const url = 'https://api.openweathermap.org/data/2.5/weather';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const container = document.querySelector('.container');
const body = document.querySelector('body');

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

    container.innerHTML = `<div class="card">
    <h2>${data.name} <sup class="country-code">${data.sys.country}</sup></h2>
		<h3>${data.weather[0].main}<span>Wind ${data.wind.speed}Kmph <span class="dot">•</span> Humidity ${data.main.humidity}%</span></h3>
		<h1>${Math.round(data.main.temp)}°</h1>
        <img src="${icon}" alt="${data.weather[0]["description"]} class="icon">
        <h3>Look For Places to Visit in This Weather</h3>
        <button class="take-me-there" id="taker">👉TAKE ME THERE</button>
        </div>
    `;
    latx = data.coord.lat;
    laty = data.coord.lon;
    temp = data.main.temp;
	document.getElementById("taker").addEventListener("click", function() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var filters;
        var desc;
        var subs = "Right now, you may want to visit: ";
        if(temp>35) {
            desc = "It's Quite Hot Outside!";
            filters = "bowling_alley,bar,night_club,casino,aquarium,movie_theater,spa,shopping_mall";
        } else if(20<=temp &&temp<=35) {
            desc = "Beautiful Temperatures!";
            filters = "amusement_park,campground,park,zoo";
        } else if(0<=temp &&temp<20) {
            desc = "Nice, Cool Weather!";
            filters = "cafe,library|aquarium|movie_theater|shopping_mall";
        } else {
            desc = "Wow, it's Cold!";
            subs = "Right now, you may want to stay home and order: ";
            filters="movie_rental,meal_delivery,meal_takeaway";
        }
        var list = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latx},${laty}&type=${filters}&rankby=distance&key=AIzaSyD1ffbPD0qcHdcKqwJCgeliy8j7miJ3uzE`;
        console.log(list);
        fetch(proxyurl + list)
            .then(response => {
                return response.json();
            })
            .then(showCities)
            .catch(err => {
                console.log(err);
            });
        function showCities(data) {
            var length = data.results.length;
            container.innerHTML = `<div class="card">
         <h2>${desc}</h2>
         <h3>${subs}</h3>
    `;
            console.log(length);
            for(var i = 0; i < length; i++) {
                console.log(data.results[i].name);
                container.appendChild(document.createTextNode(data.results[i].name));
                container.appendChild(document.createElement("br"));
            }

        }
    })
    if (data.weather[0].main === "Rain") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1486016006115-74a41448aea2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80')";
        console.log("Rain image  deployed.")
    };

    if (data.weather[0].main === "Clouds") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1542315426-2db062a5a3f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')";
        console.log("Clouds image  deployed.")
    };

    if (data.weather[0].main === "Haze") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1436459826008-8fd497f03742?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')";
        console.log("Haze image  deployed.")
    };


    if (data.weather[0].main === "Clear") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502200893034-b7bca90610ef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80')";
        console.log("Clear sky image  deployed.")
    };

    if (data.weather[0].main === "Thunderstorm") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1600323847785-fe21bc36acdf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')";
        console.log("Thunderstorm image deployed")
    };
    if (data.weather[0].main === "Drizzle") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')";
        console.log("Drizzle image deployed")
    };
    if (data.weather[0].main === "Snow") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1517299321609-52687d1bc55a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')";
        console.log("Drizzle image deployed")
    };
    if (data.weather[0].main === "Mist") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1603084612486-bf17185f7b22?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')";
        console.log("Drizzle image deployed")
    };
    if (data.weather[0].main === "Smoke") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1540800458874-73e6a5eed8ac?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80')";
        console.log("Drizzle image deployed")
    };
    if (data.weather[0].main === "Dust") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1602160702865-ed5705fa8e44?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')";
        console.log("Drizzle image deployed")
    };
    if (data.weather[0].main === "Fog") {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1479476437642-f85d89e5ad7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')";
        console.log("Drizzle image deployed")
    };
}
