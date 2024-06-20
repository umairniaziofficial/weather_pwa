import "./output.css";
import Banner from "./assets/bg.png";
import { CiSearch } from "react-icons/ci";
import { fetchWeather } from "./components/weatherfetchapi";
import { useState } from "react";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  const search = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div
      className="h-screen brightness-90 bg-cover bg-center"
      style={{ backgroundImage: `url(${Banner})` }}
    >
      <div className="h-screen flex justify-center items-center flex-col max-w-md mx-auto  pb-32 ">
        <form className="bg-slate-800 text-2xl rounded flex w-full" onSubmit={search}>
          <input
            type="text"
            placeholder="Enter city name here"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-2 py-2 rounded-l w-full placeholder:text-base outline-none shadow-2xl"
          />
          <button type="submit" className="px-3">
            <CiSearch className="text-white hover:text-orange-500" />
          </button>
        </form>
        {weather && weather.main && (
          <div className="mt-12 bg-white w-full rounded py-4 flex items-center flex-col shadow-2xl">
            <h1 className="text-4xl font-bold py-3">{weather.name}</h1>
            <h1 className="text-2xl font-bold py-3">{weather.main.temp}°C</h1>
            <h1 className="text-2xl font-bold py-3 capitalize">{weather.weather[0].description}</h1>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description + " icon"}
              className="drop-shadow-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
}
