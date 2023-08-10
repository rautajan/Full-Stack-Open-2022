import { useState } from "react";
import CountryFilter from "./components/CountryFilter";
import axios from "axios";
import ShowCountry from "./components/ShowCountry";
import { useEffect } from "react";

const App = () => {
  const [serverData, setServerData] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState(null);

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
      return country.name.common.toLowerCase().includes(filterValue.toLowerCase());
    });
    setCountries(filteredCountries);
  };

  const handleShowButton = (country) => {
    setCountries([country])
  }

  return (
    <div>
      <CountryFilter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <ShowCountry countries={countries} handleShowButton={handleShowButton}/>
    </div>
  );
};
export default App;
