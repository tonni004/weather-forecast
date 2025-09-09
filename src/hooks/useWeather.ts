import { useState } from "react";
import axios from "axios";

interface WeatherData {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  wind: number;
  icon?: string;
}

const cache: Record<string, { data: WeatherData; timestamp: number }> = {};

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    const now = Date.now();

    if (cache[city] && now - cache[city].timestamp < 10 * 60 * 1000) {
      setWeather(cache[city].data);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`https://wttr.in/${city}?format=j1`);
      const current = res.data.current_condition[0];

      const data: WeatherData = {
        city,
        temp: parseFloat(current.temp_C),
        description: current.weatherDesc[0].value,
        humidity: parseInt(current.humidity),
        wind: parseFloat(current.windspeedKmph),
        icon: "",
      };

      cache[city] = { data, timestamp: now };
      setWeather(data);
    } catch {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
};
