import axios from "axios";

const Api_Key = process.env.REACT_APP_OPENWEATHER_API;
export const fetchWeather = async (query) => {
  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?", {
      params: {
        q: query,
        units: "metric",
        appid: Api_Key,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching the weather data:", error);
    throw error;
  }
};
