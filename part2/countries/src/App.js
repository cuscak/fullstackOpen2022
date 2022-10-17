import { useState } from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails'
import CountryButton from './components/CountryButton'

function App() {
  const [searchCountry, setSearchCountry] = useState([])
  const [searchResult, setSearchResult] = useState([])

  const handleSearch = (event) => {
    axios
      //.get('http://localhost:3001/countries')
      .get(`https://restcountries.com/v3.1/name/${event.target.value}`)
      .then( response => {
        setSearchResult(response.data)
      })

    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <p>find countries 
        <input
          value={searchCountry}
          onChange={handleSearch}
        />
      </p>
        {searchResult.length === 1
          ? <CountryDetails country={searchResult[0]} />
          : searchResult.length >= 10
            ? <p>Too many matches, specify another filter</p>
            : searchResult.map(c => <CountryButton key={c.ccn3} country={c} />)
        }
    </div>
  );
}

export default App;
