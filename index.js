async function fetchData() {
    try {

        // my api url, with hard coded latitude and longitude of cookeville
        const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,is_day&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago"

        //sending a get request to the api to make sure the API is responding and reachable
        const response = await fetch(apiUrl)

        //if its not responding or reachable, throwing an error
        if (!response.ok) {
            throw new Error("Could not get the data from the Weather API")
        }

        const data = await response.json()

        // Fetching current weather data from the API
        const current = data.current

        // Fetching the temperature and priting it out
        const temperatureDisplay = document.getElementById("temperatureDisplay")
        temperatureDisplay.textContent = `${current.temperature_2m}°F`


        // Fetching the humidity and priting it out
        const humidityDisplay = document.getElementById("relativeHumidity")
        humidityDisplay.textContent = `${current.relative_humidity_2m}%`

        // Fetching the apparent temperature and priting it out
        const apparentTempDisplay = document.getElementById("apparentTemp")
        apparentTempDisplay.textContent = `${current.apparent_temperature}°F`


        // Fetching the percipitation data and priting it out
        const precipitationDisplay = document.getElementById("Precipitation")
        precipitationDisplay.textContent = `${current.precipitation} inches`

        // Displaying the weather icon for current conditions
        const weatherIcon = document.getElementById("weatherIcon")
        const currentConditions = document.getElementById("currentConditions")
        const weatherCode = current.weather_code
        const isDay = current.is_day 

        // Mapping of weather codes to appropriate open weather icons
        const iconMap = {
            // Clear sky - d for day and n for night
            0: { day: "01d", night: "01n", description: "Clear sky" },
            // Rain - d for day and n for night
            61: { day: "10d", night: "10n", description: "Rain" }, 
            // Snow - d for day and n for night
            71: { day: "13d", night: "13n", description: "Snow" }, 
        }

        // Determine if it's day or night
        const iconType = isDay === 1 ? "day" : "night"

        // Get the appropriate icon code and description
        const iconInfo = iconMap[weatherCode] || { day: "01d", night: "01n", description: "Clear sky" }
        const iconCode = iconInfo[iconType]
        const iconDescription = iconInfo.description
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

        if (weatherIcon) {
            weatherIcon.src = iconURL
            weatherIcon.alt = iconDescription
            weatherIcon.style.display = "inline" // Make the image visible
        } else {
            console.error("Weather icon element not found")
        }

        currentConditions.textContent = iconDescription

    } catch (error) {
        //added console.error for debug 
        console.error(error) 
        
        // Displaying error using SweetAlert2
        Swal.fire({
            title: "There is an Error!",
            icon: "error",
            text: "An error occurred while fetching weather data. Please try again.",
        })
    }
}

// Automatically fetches and displays the Weather data when the page loads up
fetchData()
