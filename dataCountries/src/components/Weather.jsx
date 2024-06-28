import axios from "axios";
import { useState, useEffect } from "react";

const Weather = (props) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/current?lat=${
          props.countries.capitalInfo.latlng[0]
        }&lon=${props.countries.capitalInfo.latlng[1]}&key=${
          import.meta.env.VITE_SOME_KEY
        }`
      )
      .then((response) => {
        setWeather(response.data.data);
      });
  }, [props.countries]);

  return (
    <div>
      <h2>{props.countries.name.common}</h2>
      <p>Capital {props.countries.capital}</p>
      <p>Area {props.countries.capital}</p>
      <h3>Languages</h3>
      <ul>
        {" "}
        {Object.values(props.countries.languages).map((lang, index) => {
          return <li key={index}>{lang}</li>;
        })}
      </ul>
      <img src={props.countries.flags.png} alt={props.countries.flags.alt} />
      {weather.length != 0 ? (
        <>
          <h2>Weather in {props.countries.capital}</h2>
          <p>Temperature: {weather[0]?.app_temp} °C</p>
          <p>Wind speed: {weather[0].wind_spd} km/h</p>
          <p>{weather[0]?.weather.description}</p>
          <img
            src={`https://cdn.weatherbit.io/static/img/icons/${weather[0]?.weather.icon}.png`}
          />
        </>
      ) : (
        <p>The weather is not available</p>
      )}
    </div>
  );
};

export default Weather;
