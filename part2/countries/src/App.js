import React, { useState, useEffect } from "react"
import axios from 'axios'

const CountryList = ({ countries, setNewSearch }) => {
  if (countries.length > 10) {
    return <div>Too many results. Please narrow your search.</div>
  }

  if (countries.length === 1) {
    const country = countries[0]
    const languages = []
    for (const key in country.languages) {
      const language = country.languages[key];
      languages.push({ key: key, language: language })
    }

    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital: {country.capital[0]}</div>
        <div>population: {country.population}</div>
        <h2>Languages</h2>
        <ul>
          {languages.map(language => {
            return (
              <li key={language.key}>{language.language}</li>
            )
          })}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200px" />
      </div>
    )
  }

  return (
    <div>
      {countries.map(country => {
        return (
          <div key={country.cca2}>{country.name.common}
            <button
              onClick={(event) => setNewSearch(event.target.parentElement.firstChild.data)}
            >show</button>
          </div>
        )
      })}
    </div>
  )
}

function App() {
  const [newSearch, setNewSearch] = useState("")
  const [countryList, setCountryList] = useState([])

  const hook = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountryList(response.data)
      })
  }

  useEffect(hook, [])

  const countryListToShow = newSearch === ""
    ? []
    : countryList.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      find countries <input
        value={newSearch}
        onChange={handleSearchChange}
      />
      <CountryList countries={countryListToShow} setNewSearch={setNewSearch} />
    </div>
  );
}

export default App;
