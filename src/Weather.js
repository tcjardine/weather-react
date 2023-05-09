import React, { useState } from "react";
import axios from "axios";
import "./App";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.main.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "88d70de67eac2bcba42225890fa32727";
    let apiUrL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial
    `;
    axios.get(apiUrL).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="searchForm mb-3" onSubmit={handleSubmit}>
      <input
        type="search"
        className="searchBar"
        placeholder="type city"
        onChange={updateCity}
      />
      <br />
      <input type="submit" className="mt-2 searchButton" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="weatherInformation">
        {form}
        Temperature: {Math.round(weather.temperature)}°F <br />
        Description: {weather.description}
        <br />
        Humidity: {weather.humidity}%
        <br />
        Wind: {weather.wind}km/hr
        <br />
        <img src={weather.icon} alt={weather.description} />
      </div>
    );
  } else {
    return form;
  }
}
