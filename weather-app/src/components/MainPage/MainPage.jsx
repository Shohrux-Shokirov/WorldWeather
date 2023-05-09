import React from 'react'
import { useFetch } from '../hooks/useFetch';
import './MainPage.css'
import Forecast from '../Forecast/Forecast';
import { RiMistFill, RiMistLine } from 'react-icons/ri'
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherShower, TiWeatherSnow, TiWeatherSunny, TiWeatherWindyCloudy } from 'react-icons/ti';



function MainPage() {

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const weekdDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  
  let today = new Date().getDay();
  let currentMonth = new Date().getMonth()
  let currentYear = new Date().getFullYear()
  let currentDay = new Date().getDate()

  const { data, dataForecast, searchLocation, setLocation, error } = useFetch()
  let type;


  if (data.weather && data.weather[0].main === 'Clear') {
    type = <TiWeatherSunny />
  } else if (data.weather && data.weather[0].main === 'Smoke') {
    type = <RiMistFill />
  } else if (data.weather && data.weather[0].main === 'Clouds') {
    type = <TiWeatherCloudy />
  } else if (data.weather && data.weather[0].main === 'Rain') {
    type = <TiWeatherShower />
  } else if (data.weather && data.weather[0].main === 'Snow') {
    type = <TiWeatherSnow />
  } else if (data.weather && data.weather[0].main === 'Haze') {
    type = <TiWeatherDownpour />
  } else if (data.weather && data.weather[0].main === 'Sand') {
    type = <TiWeatherWindyCloudy />
  }
  else if (data.weather && data.weather[0].main === 'Mist') {
    type = <RiMistLine />
  }

  return (
    <div className={`container_earth container-${data.weather && data.weather[0].main}`} >
      <div className="left">
        {!data.main &&
          <div className="earth move">
            <img id="earth" src="../assets/images/earth1.png" alt="" />
            <img id="moon" src="../assets/images/moon.png" alt="" />
          </div>}
      </div>

      <div className="right">
        <div className="text-area">
          {error && <div className="error">{error}</div>}
          <div >
            <input onInput={e => setLocation(e.target.value)} type="text" autoFocus maxLength="30" onKeyUp={searchLocation} placeholder='Where are you now?' />
          </div>
          {data.main &&
            <div>
              <div className="txt">
                <div className="temp">
                  {data.main && Math.floor(data.main.temp)} <sup>o</sup>C
                  {<div className="date"> {weekdDay[today-1]} {months[currentMonth]} {currentDay} {currentYear}</div>}
                </div>
                <div className="h-line"></div>
                <div className="type">
                  <div className="weather">
                    {data.weather && data.weather[0].main}
                  </div>
                  <div id="weather-icon">
                    <i>{type}</i>
                  </div>
                </div>
              </div>
              <div className="location">
                {data.name}, {data.sys && data.sys.country}
              </div>
            </div>}
        </div>
        <Forecast dataForecast={dataForecast} weekdDay={weekdDay} today={today} />
      </div>
    </div>
  )
}

export default MainPage