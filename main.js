    const cityInput = document.getElementById("city");
    const apiKey = '81efff78dcdf4e44682d2d186075ff57';
    const weatherInfo = document.getElementById('weather-info');
    const getWeatherBtn = document.getElementById('get-weather');
    const appTitle = document.getElementById('appTitle');
    
    getWeatherBtn.addEventListener('click', getWeather);
    
    function getWeather() {
        const city = document.getElementById('city').value.trim();
        if (city === '') {
            weatherInfo.innerHTML = 'Please enter a city name.';
            return;
        }
    
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},US&appid=${apiKey}&units=imperial`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found or invalid API key');
                }
                return response.json();
            })
            .then(data => {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const cityName = data.name;

                weatherInfo.innerHTML = `
                    <h2 style="background-color: lightyellow; color: darkslateblue;">Weather in ${cityName}</h2>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                    <p style="background-color: lightyellow; color: darkslateblue;">${capitalizeFirstLetters(description)}</p>
                    <p style="background-color: lightyellow; color: darkslateblue;">Temperature: ${temperature} &deg;F</p>
                `;

                appTitle.style.display = 'none';

            })
            .catch(error => {
                weatherInfo.innerHTML = `Error: ${error.message}`;
            });
    }
    

    function capitalizeFirstLetters(phrase) {
        return phrase
            .split(' ')                       // Split the phrase into words
            .map(word =>                      // Capitalize each word
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');                      // Join the words back into a single string
    }

    

   

