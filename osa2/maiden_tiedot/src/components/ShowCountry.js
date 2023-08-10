const ShowCountry = ({ countries, handleShowButton }) => {
  if (!countries) {
    return null;
  } else if (countries.length > 10) {
    return <div>Too many matches, spesify another filter</div>;
  } else if (countries.length === 1) {
    const country = countries[0];
    const languages = Object.values(country.languages);

    return (
      <div>
        <h2>{country.name.common}</h2>
        capital {country.capital}
        <br />
        area {country.area}
        <h3>languages:</h3>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          style={{ width: "150px", heigth: "auto" }}
        />
      </div>
    );
    console.log(countries[0]);
  }

  return (
    <div>
      {countries.map((country, index) => (
        <div key={index}>{country.name.common}
        <button onClick={()=>handleShowButton(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default ShowCountry;
