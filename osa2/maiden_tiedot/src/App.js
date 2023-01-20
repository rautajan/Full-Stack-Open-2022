import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const Finder = (props) => {
  return (
    <>
      find countries
      <input value={props.character} onChange={props.onChange} />
    </>
  );
};

const App = () => {
  const [character, setNewCharacater] = useState("");
  const [allData, setAllData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [capital, setCapital] = useState("Helsinki");
  const [prevCapital, setPrevCapital] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
 

  const handleCharacterChange = (event) => {
    setNewCharacater(event.target.value);
    setCountries(
      allData.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
    //console.log("Maat listassa", countries)
  };

  const drawOneCountry = () => {
    if (prevCapital !== countries[0].capital) {
      setPrevCapital(countries[0].capital);
      setCapital(countries[0].capital);
    }
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>capital {countries[0].capital}</p>
        <p>area {countries[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {countries.map((country) => {
            //console.log((Object.values(country.languages)).map(value => value))
            return Object.values(country.languages).map((value) => (
              <li key={value}>{value}</li>
            ));
          })}
        </ul>
        <img style={{ width: 150, height: 150 }} src={countries[0].flags.png} />
      </div>
    );
  };

  const drawClickedCountry = (country) => {
    setCountries(
      countries.filter((c) => country.name.common === c.name.common)
    ); //uudelleen renderöinti koska tila muuttuu => draweria kutsutaan uudestaan
  };

  const drawer = () => {
    const countryNames =
      countries.length === 0
        ? null
        : countries.map((country) => {
            return (
              <p key={country.name.common}>
                {country.name.common}{" "}
                <button onClick={() => drawClickedCountry(country)}>
                  show
                </button>
              </p>
            );
          });
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    if (countries.length === 1) {
      return drawOneCountry();
    }
    return countryNames;
  };

  const weather = () => {
    if (countries.length === 1) {
      return (
        <div>
          <h2>Weather in {capital}</h2>
          <p>
            temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celsius
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="saaikoni"
          />

          <p>Wind {weatherData.wind.speed} m/s</p>
        </div>
      );
    }
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setAllData(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
      )
      .then((response) => {
        setCapital(response.data.name);
        setWeatherData(response.data);
      });
  }, [capital]);

  return (
    <div>
      <Finder character={character} onChange={handleCharacterChange} />
      {/* {countries.length !==0 ? countries.map (country => <p>{country.name.common}</p>) : []} */}
      {drawer()}
      {weather()}

      {/* <button onClick={() => console.log("click") drawOneCountry()}> show</button> */}
    </div>
  );
};

//LAITA .ENV tiedosto git ignoreen

export default App;
