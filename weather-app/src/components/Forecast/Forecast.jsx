import React from 'react'
import './Forecast.css'
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherShower, TiWeatherSnow, TiWeatherSunny, TiWeatherWindyCloudy } from 'react-icons/ti'



function Forecast({ dataForecast, today, weekdDay}) {

  const forecastDays = weekdDay.slice(today, weekdDay.length).concat(weekdDay.slice(0, today))

  
  function checkIcon(icon) {
    switch (icon) {
      case "Clear":
        return <TiWeatherSunny />
        break;
      case 'Smoke':
        return <TiWeatherWindyCloudy />
        break;
      case 'Clouds':
        return <TiWeatherCloudy />
        break;
      case 'Rain':
        return <TiWeatherShower />
        break;
      case 'Snow':
        return <TiWeatherSnow />
        break;
      case 'Haze':
        return <TiWeatherDownpour />
        break;
      case 'Sand':
        return <TiWeatherDownpour />
        break;
      default:
        break;
    }
  }

  // dataForecast && dataForecast.list.slice(0, 7).map((item, idx) => { return console.log(item.weather[0].main) })



  return (
    <div className='forecast' >
      {dataForecast && dataForecast.list.slice(0, 7).map((item, idx) => {
        return (
          <div key={idx} className="day mon"> {forecastDays[idx].substr(0, 3)} <hr />
            {checkIcon(item.weather[0].main)}
            <div className="temp"> {Math.round(item.main.temp)} <sup>o</sup>C</div>
          </div>
        )
      })}
    </div>
  )
}

export default Forecast