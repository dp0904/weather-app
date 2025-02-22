async function fetchData() {
    try {
        // Fixed latitude and longitude for Cookeville, TN
        const latitude = 36.1628;
        const longitude = -85.5016;

        // API URL for Cookeville weather
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Could not get the data from the Weather API");
        }

        const data = await response.json();
        console.log("API Response:", data); // Debug: Log the API response

        // Extract current weather data
        const current = data.current;

        // Display the temperature
        const temperatureDisplay = document.getElementById("temperatureDisplay");
        if (temperatureDisplay) {
            temperatureDisplay.textContent = `Current Temperature: ${current.temperature_2m}°F`;
        } else {
            console.error("Temperature display element not found");
        }

        // Display the relative humidity
        const humidityDisplay = document.getElementById("relativeHumidity");
        if (humidityDisplay) {
            humidityDisplay.textContent = `Humidity: ${current.relative_humidity_2m}%`;
        } else {
            console.error("Humidity display element not found");
        }

        // Display the apparent temperature
        const apparentTempDisplay = document.getElementById("apparentTemp");
        if (apparentTempDisplay) {
            apparentTempDisplay.textContent = `Feels Like: ${current.apparent_temperature}°F`;
        } else {
            console.error("Apparent temperature display element not found");
        }

        // Display the precipitation
        const precipitationDisplay = document.getElementById("Precipitation");
        if (precipitationDisplay) {
            precipitationDisplay.textContent = `Precipitation: ${current.precipitation} inches`;
        } else {
            console.error("Precipitation display element not found");
        }

        // Display the weather icon
        const weatherIcon = document.getElementById("weatherIcon");
        const weatherCode = current.weather_code;
        console.log("Weather Code:", weatherCode); // Debug: Log the weather code

        // Map Open Meteo weather_code to OpenWeatherMap icon_code
        const iconMap = {
            0: "01d", // Clear sky (day)
            1: "02d", // Mainly clear (day)
            2: "03d", // Partly cloudy (day)
            3: "04d", // Overcast (day)
            45: "50d", // Fog
            48: "50d", // Depositing rime fog
            51: "09d", // Light drizzle
            53: "09d", // Moderate drizzle
            55: "09d", // Dense drizzle
            56: "13d", // Light freezing drizzle
            57: "13d", // Dense freezing drizzle
            61: "10d", // Slight rain
            63: "10d", // Moderate rain
            65: "10d", // Heavy rain
            66: "13d", // Light freezing rain
            67: "13d", // Heavy freezing rain
            71: "13d", // Slight snow
            73: "13d", // Moderate snow
            75: "13d", // Heavy snow
            77: "13d", // Snow grains
            80: "09d", // Slight rain showers
            81: "09d", // Moderate rain showers
            82: "09d", // Violent rain showers
            85: "13d", // Slight snow showers
            86: "13d", // Heavy snow showers
            95: "11d", // Thunderstorm
            96: "11d", // Thunderstorm with slight hail
            99: "11d", // Thunderstorm with heavy hail
        };

        const iconCode = iconMap[weatherCode] || "01d"; // Default to clear sky icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        console.log("Icon URL:", iconUrl); // Debug: Log the icon URL

        if (weatherIcon) {
            weatherIcon.src = iconUrl;
            weatherIcon.alt = `Weather Icon for code ${weatherCode}`;
            weatherIcon.style.display = "block"; // Make the image visible
        } else {
            console.error("Weather icon element not found");
        }

        // Extract hourly weather data (first hour)
        const hourly = data.hourly;

        // Display hourly temperature
        const hourlyTempDisplay = document.getElementById("hourlyTemp");
        if (hourlyTempDisplay) {
            hourlyTempDisplay.textContent = `Hourly Temperature: ${hourly.temperature_2m[0]}°F`;
        } else {
            console.error("Hourly temperature display element not found");
        }

        // Display hourly humidity
        const hourlyHumidityDisplay = document.getElementById("hourlyHumidity");
        if (hourlyHumidityDisplay) {
            hourlyHumidityDisplay.textContent = `Hourly Humidity: ${hourly.relative_humidity_2m[0]}%`;
        } else {
            console.error("Hourly humidity display element not found");
        }

        // Display hourly precipitation probability
        const hourlyPrecipProbDisplay = document.getElementById("hourlyPrecipProb");
        if (hourlyPrecipProbDisplay) {
            hourlyPrecipProbDisplay.textContent = `Hourly Precipitation Probability: ${hourly.precipitation_probability[0]}%`;
        } else {
            console.error("Hourly precipitation probability display element not found");
        }

        // Display hourly rain
        const hourlyRainDisplay = document.getElementById("hourlyRain");
        if (hourlyRainDisplay) {
            hourlyRainDisplay.textContent = `Hourly Rain: ${hourly.rain[0]} inches`;
        } else {
            console.error("Hourly rain display element not found");
        }

        // Extract daily weather data (first day)
        const daily = data.daily;

        // Display max temperature
        const maxTempDisplay = document.getElementById("maxTemp");
        if (maxTempDisplay) {
            maxTempDisplay.textContent = `Max Temperature: ${daily.temperature_2m_max[0]}°F`;
        } else {
            console.error("Max temperature display element not found");
        }

        // Display min temperature
        const minTempDisplay = document.getElementById("minTemp");
        if (minTempDisplay) {
            minTempDisplay.textContent = `Min Temperature: ${daily.temperature_2m_min[0]}°F`;
        } else {
            console.error("Min temperature display element not found");
        }

        // Display max precipitation probability
        const maxPrecipProbDisplay = document.getElementById("maxPrecipProb");
        if (maxPrecipProbDisplay) {
            maxPrecipProbDisplay.textContent = `Max Precipitation Probability: ${daily.precipitation_probability_max[0]}%`;
        } else {
            console.error("Max precipitation probability display element not found");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching weather data. Please try again.");
    }
}

// Automatically fetch and display weather data when the page loads
fetchData();
