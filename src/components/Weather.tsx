import React, {memo} from 'react';
import Spinner from './Spinner';
import { useWeather } from '../hooks/useWeather';
import { useKeyHandler } from '../hooks/userKeyHandler';
import WeatherProps from '../types/Weather';
import AppConfig from '../config/Config';
import Image from './Image';
import '../styles/Weather.css';
//
//- Fetch live weather data using the OpenWeatherMap API or a similar service.
//- Display the following details for the selected city:
//- Current temperature.
//- Weather condition (e.g., sunny, rainy).
//- Humidity percentage.
//- Show a relevant weather icon.
//

const WeatherIcon: React.FC<{icon: string, description: string}> = memo(({icon, description}) => {
  return (
    <div className="weather_image_container">
      <Image className='weather_icon' src={AppConfig.WEATHER_ICON_ENDPOINT.replace("<icon>",icon)} alt={description}/>
    </div>
  );
});


const WeatherInfo: React.FC<{temperature: number, description : string, humidity: number}> = memo(({temperature, description, humidity}) => {
  let temp = Math.floor(temperature * 10) / 10;
  return (
      <>
      <div className='weather_temp'>{temp}°C</div>
      <div className='weather_conditions'>{description}</div>
      <div className='weather_humidity'>Humidity {humidity}%</div>
      </>
  );
});

const Weather: React.FC<WeatherProps> = memo(({onSelect, city, active, onClose}) => {
  const { weather:weatherData, loading, error } = useWeather(city);
  console.log(`Weather Component City ${city}, state ${active}`);
   useKeyHandler({
      componentName:"Weather",
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
          <WeatherIcon icon={weatherData.weather[0].icon}  description={weatherData.weather[0].description}/>
          <WeatherInfo temperature={weatherData.main.temp} description={weatherData.weather[0].description} humidity={weatherData.main.humidity} />
        </div>
      )}
    </div>
  );
});

export default Weather;