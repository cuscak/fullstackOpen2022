import { useEffect, useState } from "react"
import axios from 'axios'

const Weather = ({ capital }) => {
    const placeholder = {
        "weather": [
            {
                "id": 741,
                "main": "Fog",
                "description": "fog",
                "icon": "50n"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 11.03,
            "feels_like": 10.46,
            "temp_min": 8.95,
            "temp_max": 13.58,
            "pressure": 1024,
            "humidity": 5
        },
        "wind": {
            "speed": 0.51,
            "deg": 0
        }
    }

    const [tempObj, setTempObj] = useState(placeholder)
    const [weatherImg, setWeatherImg] = useState("https://openweathermap.org/img/wn/01d@2x.png")

    useEffect(
        () => {
            const api_key = process.env.REACT_APP_API_KEY
            axios
                .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`)
                .then(response => {
                    axios
                        .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key}`)
                        .then(secResponse => {
                            setTempObj(secResponse.data)
                            setWeatherImg(`https://openweathermap.org/img/wn/${secResponse.data.weather[0].icon}@2x.png`)
                        })
                })
        },
        [capital]
    )

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>temperature {tempObj.main.temp} Celsius</p>
            <img src={weatherImg} alt="weather icon" />
            <p>wind {tempObj.wind.speed} m/s</p>
        </div>
    )
}

export default Weather