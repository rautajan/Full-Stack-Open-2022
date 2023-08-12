import { useState } from "react";
import CountryFilter from "./components/CountryFilter";
import axios from "axios";
import ShowCountry from "./components/ShowCountry";
import { useEffect } from "react";
import ShowWeather from "./components/ShowWeather";

const App = () => {
  const [serverData, setServerData] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState(null);
  const [weather, setWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setServerData(response.data);
      });
  }, []);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setNewFilter(filterValue);
    findCountries(filterValue);
  };
  const findCountries = (filterValue) => {
    const filteredCountries = serverData.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });
    setCountries(filteredCountries);

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`;
      axios.get(apiUrl).then((response) => {
        setWeather(response.data);
      });
    }
  };
  const handleShowButton = (country) => {
    setCountries([country]);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`;
    axios.get(apiUrl).then((response) => {
      setWeather(response.data);
    });
  };

  return (
    <div>
      <CountryFilter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <ShowCountry countries={countries} handleShowButton={handleShowButton} />
      <ShowWeather countries={countries} weather={weather} />
    </div>
  );
};

export default App;
