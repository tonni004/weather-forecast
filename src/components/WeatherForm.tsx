import { useState } from "react";

interface Props {
  onSearch: (city: string) => void;
}

export const WeatherForm = ({ onSearch }: Props) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center mt-6 text-gray-700">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        className="border rounded-lg p-2 w-60 outline-none"
      />
      {city && <button type="button" className="text-white" onClick={() => setCity('')}>x</button>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};
