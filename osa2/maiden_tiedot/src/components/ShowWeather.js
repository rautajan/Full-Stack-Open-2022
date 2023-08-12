import { useEffect, useState } from "react";

const ShowWeather = ({ countries, weather }) => {
  if (!countries || countries.length !== 1 || !weather) {
    return null;
  }

  const country = countries[0];
  const languages = Object.values(country.languages);
  const latitude = country.capitalInfo.latlng[0];
  const longitude = country.capitalInfo.latlng[1];

  let icon = weather.weather[0].icon;
  const logo = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        style={{ width: "150px", heigth: "auto" }}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default ShowWeather;
