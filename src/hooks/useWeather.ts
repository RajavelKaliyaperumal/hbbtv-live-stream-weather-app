import { useState, useEffect } from "react";
import WeatherData from "../types/WeatherData";
import AppConfig from "../config/Config";
//
//- Weather API responses are cached for 10 minutes to reduce network requests.
//- A retry strategy with Fibonacci backoff is implemented to handle network issues when fetching weather data.
//
const CACHE_DURATION = AppConfig.WEATHER_API_RESPONSE_CACHE_DURATION;

const fibonacci = (n: number): number => {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

export const useWeather = (location: string) => {
 
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const API_URL = AppConfig.WEATHER_API_ENDPOINT.replace("<city>",location);
    console.log(API_URL);
    const cacheKey = `weather_${location}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTimestamp) {
      const timeElapsed = Date.now() - parseInt(cachedTimestamp, 10);
      if (timeElapsed < CACHE_DURATION) {
        setWeather(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }

    const fetchWeather = async (retryCount = 0) => {
      if (!isMounted) return;

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        
        const data = await response.json();
        const weatherData: WeatherData = data;
        setWeather(weatherData);
        setLoading(false);
        setError(null);

        localStorage.setItem(cacheKey, JSON.stringify(weatherData));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      } catch (err) {
        if (retryCount <= AppConfig.WEATHER_API_RETRY_COUNT) {
          const delay = fibonacci(retryCount + 1) * 3000; // Fibonacci delay in milliseconds
          console.log(`Retrying in ${delay / 1000} seconds...`);
          setTimeout(() => fetchWeather(retryCount + 1), delay);
        } else {
          setError("Failed to fetch weather data after multiple attempts.");
          setLoading(false);
        }
      }
    };

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [location]);

  return { weather, loading, error };
};

//{"coord":{"lon":-3.7026,"lat":40.4165},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"},{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"base":"stations","main":{"temp":7.71,"feels_like":4.1,"temp_min":6.79,"temp_max":8.68,"pressure":1011,"humidity":93,"sea_level":1011,"grnd_level":936},"visibility":9000,"wind":{"speed":6.69,"deg":210,"gust":11.83},"rain":{"1h":1.26},"clouds":{"all":100},"dt":1738167159,"sys":{"type":2,"id":2084029,"country":"ES","sunrise":1738135613,"sunset":1738171730},"timezone":3600,"id":3117735,"name":"Madrid","cod":200}