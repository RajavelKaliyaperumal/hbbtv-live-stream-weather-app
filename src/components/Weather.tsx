import React from 'react';
import Spinner from './Spinner';
import { useWeather } from '../hooks/useWeather';
import { useKeyHandler } from '../hooks/userKeyHandler';
import WeatherProps from '../types/Weather';
import '../styles/Weather.css';
//
//- Fetch live weather data using the OpenWeatherMap API or a similar service.
//- Display the following details for the selected city:
//- Current temperature.
//- Weather condition (e.g., sunny, rainy).
//- Humidity percentage.
//- Show a relevant weather icon.
//

const Weather: React.FC<WeatherProps> = ({onSelect, city, active, onClose}) => {
  const { weather:weatherData, loading, error } = useWeather(city);

   useKeyHandler({
      onEnter: () => {
        if(active){
          onSelect(city);
        }
      },
      onArrowLeft:()=>{
        onClose();
      },
      onArrowRight:()=>{
        onClose();
      },
      onArrowDown:()=>{
        onClose();
      },
      onArrowUp:()=>{
        onClose();
      }
    });
  
  return (
    <div className="weather_wrapper">
      <div  className={`weather_header ${active ? "selected" : ""}`} >
        <div className='weather_city'>{city}</div>
      </div>

      {loading && <div className='weather_loading'><Spinner/></div>}
      {error && <div className='weather_error'>{error}</div>}

      {weatherData && !loading && !error && (
          <div className="weather_container">
          <div className='weather_image_container'>
            <img className='weather_icon'
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt={weatherData.weather[0].description}
          /></div>
          <div className='weather_temp'>{Math.round(weatherData.main.temp)}°C</div>
          <div className='weather_conditions'>{weatherData.weather[0].description}</div>
          <div className='weather_humidity'>Humidity {weatherData.main.humidity}%</div>
        </div>
      )}
    </div>
  );
};

export default Weather;

//<div className='weather_conditions'>{weatherData.weather[0].description}</div>
//<div className='weather_humidity'>Humidity {weatherData.main.humidity}%</div>-->