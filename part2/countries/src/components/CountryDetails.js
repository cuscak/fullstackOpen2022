import Weather from "./Weather"


const CountryDetails = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <br />
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.keys(country.languages).map( k =>  <li key={k}>{country.languages[k]}</li>)}
            </ul>
            <img src={country.flags.svg} alt="country flag" width="300" height="400"/>
            <Weather capital={country.capital} />
        </div>
    )
}

export default CountryDetails