interface WeatherData {
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    name: string;
  }

export default WeatherData;