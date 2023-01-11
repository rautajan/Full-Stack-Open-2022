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

  // const drawOneCountry = () => {
  //   console.log("yksi maa", countries);
  //   return (
  //     <div>
  //       <h1>{countries[0].name.common}</h1>
  //       <p>capital {countries[0].capital}</p>
  //       <p>area {countries[0].area}</p>
  //       <h3>languages:</h3>
  //       <ul>
  //         {countries.map((country) => {
  //           //console.log((Object.values(country.languages)).map(value => value))
  //           return Object.values(country.languages).map((value) => (
  //             <li>{value}</li>
  //           ));
  //         })}
  //       </ul>
  //       <img style={{ width: 150, height: 150 }} src={countries[0].flags.png} />
  //     </div>
  //   );
  // };

  const Drawer = () => {
    const countryNames =
      countries.length === 0
        ? null
        : countries.map((country) => {
           // console.log("1-10 maata", countries);
            return <p key={country.name.common}>{country.name.common}</p>;
          });
    if (countries.length > 10) {
      //console.log("yli kymmenen", countries);
      return <p>Too many matches, specify another filter</p>;
    }
    if (countries.length === 1) {
      //console.log("yksi maa", countries);
      //drawOneCountry;
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
          <img
            style={{ width: 150, height: 150 }}
            src={countries[0].flags.png}
          />
        </div>
      );
    }
    //console.log("countryNames", countryNames, "countries:", countries);
    return countryNames;
  };



  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setAllData(response.data);
    });
  }, []);


  return (
    <div>
      <Finder character={character} onChange={handleCharacterChange} />
      {/* {countries.length !==0 ? countries.map (country => <p>{country.name.common}</p>) : []} */}
      <Drawer />
      {/* {countryNames} */}
    </div>
  );
};

export default App;
