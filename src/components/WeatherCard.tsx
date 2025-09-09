interface Props {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  wind: number;
  icon?: string;
}

export const WeatherCard = ({ city, temp, description, humidity, wind }: Props) => {
  const weatherBg =
    description.toLowerCase().includes("rain") ? "bg-blue-200" :
      description.toLowerCase().includes("snow") ? "bg-gray-200" :
        description.toLowerCase().includes("clear") ? "bg-yellow-100" :
          description.toLowerCase().includes("cloud") ? "bg-gray-300" :
            "bg-green-100";

  const getEmoji = (desc: string) => {
    const lower = desc.toLowerCase();
    if (lower.includes("sun") || lower.includes("clear")) return "☀️";
    if (lower.includes("rain") || lower.includes("drizzle")) return "🌧️";
    if (lower.includes("snow")) return "❄️";
    if (lower.includes("cloud")) return "☁️";
    if (lower.includes("storm") || lower.includes("thunder")) return "⛈️";
    return "🌤️";
  };

  return (
    <div className={`mt-10 p-6 rounded-2xl shadow-lg w-80 text-center text-gray-700 ${weatherBg}`}>
      <div className={ "flex items-center justify-between m-3"}>
        <h2 className="text-2xl font-bold">{city[0].toUpperCase() + city.slice(1).toLowerCase()}</h2>
        <h3 className="text-2xl font-bold">{Math.round(temp)}°C</h3>
      </div>

      <p className="capitalize text-end mb-2">{description} {getEmoji(description)}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind: {wind} km/h</p>
    </div>
  );
};

