import { ChangeEvent, MouseEvent, useState } from "react"

type Props = {
    onSubmit: (searchFilters: {
        term: string,
        includeTerritories: boolean,
        populationRange: string
    }) => void
}

export default function SearchForm({ onSubmit }: Props) {
    const [formValues, setFormValues] = useState({
        term: "",
        includeTerritories: false,
        populationRange: "0-5"
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => 
        setFormValues({ 
            ...formValues, 
            [event.target.name]: event.target.value 
        })

    const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) =>
        setFormValues({ 
            ...formValues, 
            [event.target.name]: event.target.checked 
        })

    const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onSubmit(formValues)
    }

    return (
        <form>
            <label>Search:</label>
            <input
                type="text"
                name="term"
                onChange={handleChange}
                value={formValues.term}
            />
            <button onClick={() => setFormValues({ ...formValues, term: "" })}>Clear</button>

            <div>
                <input
                    type="checkbox"
                    name="includeTerritories"
                    onChange={handleCheckChange}
                    checked={formValues.includeTerritories}
                /> Include Territories

                <input type="radio" name="populationRange" value="0-5"
                    onChange={handleChange}
                    checked={formValues.populationRange === "0-5"}
                /> 0-5m
                <input type="radio" name="populationRange" value="5-10"
                    onChange={handleChange}
                    checked={formValues.populationRange === "5-10"}
                /> 5m-10m
                <input type="radio" name="populationRange" value="10+"
                    onChange={handleChange}
                    checked={formValues.populationRange === "10+"}
                /> 10m+
            </div>

            <button onClick={handleSubmit}>Search</button>
        </form>
    )
}