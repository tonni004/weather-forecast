import { WeatherForm } from "./components/WeatherForm";
import { WeatherCard } from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import { Loader } from "./components/Loader";

function App() {
  const { weather, loading, error, fetchWeather } = useWeather();

  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <h1 className="text-3xl font-bold mt-25 mb-10">🌤️ <span className="text-gray-800">Weather</span> Forecast</h1>
      <WeatherForm onSearch={fetchWeather} />

      {loading && (
        <div className="mt-10">
          <Loader />
        </div>
      )}

      {error && <p className="mt-6 text-red-500">{error}</p>}
      {!loading && ! error && weather && <WeatherCard {...weather} />}
    </div>
  );
}

export default App;


