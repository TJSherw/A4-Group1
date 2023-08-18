const apiKey = '19d93596a0734e76a7013010231708';
    const weatherInfoElement = document.getElementById('weather-info');
    const cityButton = document.getElementById('city-button');
    const cityInput = document.getElementById('city-input');

    cityButton.addEventListener('click', async () => {
      const cityName = cityInput.value;
      if (cityName) {
        weatherInfoElement.innerHTML = 'Loading...';
        await displayWeather(cityName);
      } else {
        weatherInfoElement.textContent = 'Please enter a city name.';
      }
    });

    cityInput.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        const cityName = cityInput.value;
        if (cityName) {
          weatherInfoElement.innerHTML = 'Loading...';
          await displayWeather(cityName);
        } else {
          weatherInfoElement.textContent = 'Please enter a city name.';
        }
      }
    });

    async function getWeatherData(cityName) {
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    }

    async function displayWeather(cityName) {
      try {
        weatherInfoElement.innerHTML = 'Loading...';
    
        const weatherData = await getWeatherData(cityName);
        const weatherDescription = weatherData.current.condition.text;
        const temperature = weatherData.current.temp_c;
        const humidity = weatherData.current.humidity;
        const windSpeed = weatherData.current.wind_kph;
        const weatherIconCode = weatherData.current.condition.icon; // Icon code from the API response
    
        const weatherInfo = `
          Weather: ${weatherDescription}<br>
          Temperature: ${temperature}°C <img src="http:${weatherIconCode}" alt="Weather Icon"><br>
          Humidity: ${humidity}%<br>
          Wind Speed: ${windSpeed} km/h
        `;
        weatherInfoElement.innerHTML = weatherInfo;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfoElement.textContent = 'Error fetching weather data';
      }
    }
    