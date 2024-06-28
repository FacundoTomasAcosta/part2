const DataCountry = (props) => {
  return (
    <div>
      <h2>{props.country.name.common}</h2>
      <p>Capital {props.country.capital}</p>
      <p>Area {props.country.area}</p>
      <h2>Languages</h2>
      <ul>
        {" "}
        {Object.values(props.country.languages).map((lang, index) => {
          return <li key={index}>{lang}</li>;
        })}
      </ul>
      <img src={props.country.flags.png} alt={props.country.flags.alt} />
    </div>
  );
};

export default DataCountry;
