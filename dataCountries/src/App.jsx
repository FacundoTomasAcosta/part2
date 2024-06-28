import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import DataCountry from "./components/DataCountry";
import Weather from "./components/Weather";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setAllCountries(countries);
    });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const countriesFilter = allCountries.filter(
    (country) =>
      country.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  );

  return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
      {countriesFilter.length == 1 ? (
        <Weather countries={countriesFilter[0]} />
      ) : countriesFilter.length < 10 ? (
        <>
          {countriesFilter.map((country) => {
            return (
              <div key={country.name.common}>
                <p>
                  {country.name.common}
                  <button
                    onClick={() => {
                      setCountries(country);
                      setShow(!show);
                    }}
                  >
                    {show && countries.name.common === country.name.common
                      ? "close"
                      : "show"}
                  </button>
                </p>
                {show &&
                countries.length !== 0 &&
                countries.name.common === country.name.common ? (
                  <DataCountry country={countries} />
                ) : null}
              </div>
            );
          })}
        </>
      ) : filter === "" ? (
        <p></p>
      ) : (
        <p>Too many matches, please specify another filter</p>
      )}
    </div>
  );
};

export default App;
