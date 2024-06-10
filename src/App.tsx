import { useState } from "react"
import { USA_STATES } from "./data"
import SearchForm from "./SearchForm"

export default function App() {
  const [searchFilters, setSearchFilters] = useState({
    term: "",
    includeTerritories: false,
    populationRange: "0-5"
  })

  const searchResults = USA_STATES.filter(
    s => (
      s.name.toLowerCase().includes(searchFilters.term.toLowerCase())
      && (searchFilters.includeTerritories || s.territory === false)
      && (
        (searchFilters.populationRange === "10+" && s.population.count >= 10000000)
        || (searchFilters.populationRange === "5-10" && s.population.count >= 5000000 && s.population.count < 10000000)
        || (searchFilters.populationRange === "0-5" && s.population.count < 5000000)
      )
    )
  )

  return (
    <div>
      <SearchForm onSubmit={setSearchFilters}/>
      <ul>
        {searchResults.map(usaState => (
          <li key={usaState.name}>{usaState.name}</li>
        ))}
      </ul>
    </div>
  )
}
