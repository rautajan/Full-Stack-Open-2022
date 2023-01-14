import { useState, useEffect } from "react";
import axios from "axios";
import { isVisible } from "@testing-library/user-event/dist/utils";

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
    //console.log("maa:", country);
    setCountries(
      countries.filter((c) => country.name.common === c.name.common)
    ); //uudelleen renderöinti koska tila muuttuu => draweria kutsutaan uudestaan
  };

  const drawer = () => {
    const countryNames =
      countries.length === 0
        ? null
        : countries.map((country) => {
            // console.log("1-10 maata", countries);
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
      //console.log("yli kymmenen", countries);
      return <p>Too many matches, specify another filter</p>;
    }
    if (countries.length === 1) {
      //console.log("yksi maa", countries);
      return drawOneCountry();
    }
    return countryNames;
  };

  const weather = () => {
    if (countries.length === 1) {
      return (
        <div>
          <h2>Weather in </h2>
        </div>
      );
    }
  };

  // const Button = () => {
  //   return (
  //     <div style={{ display: "flex" }}>
  //       <Drawer />
  //       <button>show</button>
  //     </div>
  //   );
  // };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setAllData(response.data);
    });
  }, []);

  // useEffect{() => {
  //   axios.get("")
  // }}

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
