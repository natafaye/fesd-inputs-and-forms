import { useState } from "react"
import { USA_STATES } from "./data"

export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [includeTerritories, setIncludeTerritories] = useState(false)
  const [populationRange, setPopulationRange] = useState("0-5")

  const searchResults = USA_STATES.filter(
    s => (
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
      && (includeTerritories || s.territory === false)
      && (
        (populationRange === "10+" && s.population.count >= 10000000)
        || (populationRange === "5-10" && s.population.count >= 5000000 && s.population.count < 10000000)
        || (populationRange === "0-5" && s.population.count < 5000000)
      )
    )
  )

  return (
    <div>
      <label>Search:</label>
      <input
        type="text"
        onChange={(event) => setSearchTerm(event.target.value)}
        value={searchTerm}
      />
      <button onClick={() => setSearchTerm("")}>Clear</button>

      <div>
        <input
          type="checkbox"
          onChange={(event) => setIncludeTerritories(event.target.checked)}
          checked={includeTerritories}
        /> Include Territories

        <input type="radio" name="population" value="0-5"
          onChange={(event) => setPopulationRange(event.target.value)}
          checked={populationRange === "0-5"}
        /> 0-5m
        <input type="radio" name="population" value="5-10"
          onChange={(event) => setPopulationRange(event.target.value)}
          checked={populationRange === "5-10"}
        /> 5m-10m
        <input type="radio" name="population" value="10+"
          onChange={(event) => setPopulationRange(event.target.value)}
          checked={populationRange === "10+"}
        /> 10m+
      </div>

      <ul>
        {searchResults.map(usaState => (
          <li key={usaState.name}>{usaState.name}</li>
        ))}
      </ul>
    </div>
  )
}
