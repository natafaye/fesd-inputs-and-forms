import { MouseEvent, useState } from "react"

type Props = {
    onSubmit: (searchFilters: { 
        term: string, 
        includeTerritories: boolean, 
        populationRange: string
    }) => void
}

export default function SearchForm({ onSubmit }: Props) {
    const [searchTermValue, setSearchTermValue] = useState("")
    const [includeTerritoriesValue, setIncludeTerritoriesValue] = useState(false)
    const [populationRangeValue, setPopulationRangeValue] = useState("0-5")


    const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onSubmit({
            term: searchTermValue,
            includeTerritories: includeTerritoriesValue,
            populationRange: populationRangeValue
        })
    }

    return (
        <form>
            <label>Search:</label>
            <input
                type="text"
                onChange={(event) => setSearchTermValue(event.target.value)}
                value={searchTermValue}
            />
            <button onClick={() => setSearchTermValue("")}>Clear</button>

            <div>
                <input
                    type="checkbox"
                    onChange={(event) => setIncludeTerritoriesValue(event.target.checked)}
                    checked={includeTerritoriesValue}
                /> Include Territories

                <input type="radio" name="population" value="0-5"
                    onChange={(event) => setPopulationRangeValue(event.target.value)}
                    checked={populationRangeValue === "0-5"}
                /> 0-5m
                <input type="radio" name="population" value="5-10"
                    onChange={(event) => setPopulationRangeValue(event.target.value)}
                    checked={populationRangeValue === "5-10"}
                /> 5m-10m
                <input type="radio" name="population" value="10+"
                    onChange={(event) => setPopulationRangeValue(event.target.value)}
                    checked={populationRangeValue === "10+"}
                /> 10m+
            </div>

            <button onClick={handleSubmit}>Search</button>
        </form>
    )
}