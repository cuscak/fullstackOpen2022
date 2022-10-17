import { useState } from "react"
import CountryDetails from "./CountryDetails"

const CountryButton = ({ country }) => {
    const [showCountryDetail, setShowCountryDetail] = useState(false)

    const handleShowButton = () => {
        setShowCountryDetail(!showCountryDetail)
    }

    return (
        <div>
            <p>{country.name.common} <button onClick={handleShowButton}>show</button> </p>
            {showCountryDetail && 
                <CountryDetails country={country} />
            }
        </div>
    )
}

export default CountryButton