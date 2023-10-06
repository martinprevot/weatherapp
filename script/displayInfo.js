var hour 
var date
var intervalHour;

const displayCityInfos = (latitude, longitude, timezone) => {
    console.log(longitude, latitude, timezone);
    this.timezone = timezone;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${timezone}&current_weather=true
    `)
      .then(res => res.json())
      .then(json => {
        const setHour = (timezone) => {
            hour = new Date().toLocaleString("fr-FR", {timeZone: `${timezone}`});
            document.querySelector("#hourText").innerHTML = hour;
        }
        setHour(timezone);
        clearInterval(intervalHour)
        intervalHour = setInterval(function () {
            setHour(timezone);
        },1000)
        document.querySelector("#temperature").innerHTML = Math.floor(json.current_weather.temperature)+ json.current_weather_units.temperature
        document.querySelector("#hourText").classList.add('fade-in')
        document.querySelector("#temperature").classList.add('fade-in')
        document.querySelector("#icon").classList.add('fade-in')
        document.querySelector("#hourText").style.visibility = 'visible'
        document.querySelector("#temperature").style.visibility = 'visible'
        document.querySelector("#icon").style.visibility = 'visible'
        console.log(json);

        switch (json.current_weather.weathercode) {
            case 0:
                document.querySelector("#icon").src = "images/weather-icons/Sunny.png";
                document.querySelector("#weatherText").innerHTML = "Clear sky"
                break;
            case 1,2,3:
                document.querySelector("#icon").src = "images/weather-icons/PartlyCloudyDay.png";
                document.querySelector("#weatherText").innerHTML = "Mainly clear, partly cloudy, and overcast"
                break
            case 51, 53, 55,56, 57,45, 48	:
                document.querySelector("#icon").src = "images/weather-icons/Mist.png";
                document.querySelector("#weatherText").innerHTML = "Drizzle: Light, moderate, and dense intensity"
                break;
            case 61, 63, 65,80, 81, 82:
                document.querySelector("#icon").src = "images/weather-icons/ModRain.png";
                document.querySelector("#weatherText").innerHTML = "Rain: Slight, moderate and heavy intensity"
                break;
            case 66, 67	:
                document.querySelector("#icon").src = "images/weather-icons/ModSleet.png";
                document.querySelector("#weatherText").innerHTML = "Freezing Rain: Light and heavy intensity"
                break;
            case 71, 73, 75,77,85, 86:
                document.querySelector("#icon").src = "images/weather-icons/ModSnow.png";
                document.querySelector("#weatherText").innerHTML = "Snow fall: Slight, moderate, and heavy intensity"
                break; 
            case 95,96,99:
                document.querySelector("#icon").src = "images/weather-icons/PartCloudRainThunderNight.png";
                document.querySelector("#weatherText").innerHTML = "Thunderstorm: Slight or moderate"
                break;
        }
      })
  }
  