import React, { useState } from 'react'
import GetCovidData from '../API/GetCovidData';
import styled from 'styled-components';

function ShowVaccineData() {

    const StyleData = styled.div`
        display: flex;
        flex-direction: column;
        justify-content:center;
        font-size: 1.1em;
        text-align: center;
    `
    const searchBox = {
        display: "block",
        margin: "0 auto"
    }

    const [query, setQuery] = useState("");
    const [searched, setSearched] = useState(false);
    const [clicked, setClicked] = useState(false);

    const {
        error,
        loading,
        vaccineResults
    } = GetCovidData(query);

    //Used to take value from input and set the query for Axios.get method
    function handleSearch(e) {
        setQuery(e.target.value);
        if (e.target.value === "") {
            setSearched(false);
        } else {
            setSearched(true);
        }
    }

    //Used to get value from the selected Element and set the query for API GET REQUEST
    function getValue(value) {
        if (value.target.innerHTML === "All") {
            return;
        }
        setQuery(value.target.innerHTML);
        setClicked(true);
    }

    //Display Only the Country Names
    function displayAllData() {
        setQuery("");
        setClicked(false);
        setSearched(false);
    }

    //If the input text field is fully deleted reset all values
    function handleInputDeletion(e) {
        if (e.key === 'Backspace') {
            setQuery("");
            setClicked(false);
            setSearched(false);
        }
    }

    //On Country name click or search, Print the Country Name and its Values
    function VaccineList() {
        const listOfVaccines = vaccineResults.map((t) =>
            <div key={t}>
                <h3>{t[1].country}</h3>
                <h4 onClick={getValue}>{t[0]}</h4>
                <p>Administered: {t[1].administered}</p>
                <p>People Vaccinated: {t[1].people_vaccinated}</p>
                <p>People Partially Vaccinated: {t[1].people_partially_vaccinated}</p>
            </div>
        )
        return <div>{listOfVaccines}</div>
    }

    //List all Country Names in the API
    function VaccineCountryList() {
        const listOfVaccines = vaccineResults.map((t) =>
            <div key={t}>
                <h4 onClick={getValue}>{t[0]}</h4>
            </div>
        )
        return <div>{listOfVaccines}</div>
    }

    //Function to check if condition and show correct view
    function ShowVaccineData() {
        if (clicked || searched) {
            if (!loading)
                return <VaccineList />
            else if(error)
                return <div>{error && "Error"}</div>
            else
                return <div>Loading...</div>
        } else {
            if (!loading)
                return <VaccineCountryList />
            else if(error)
                return <div>{error && "Error"}</div>
            else
                return <div>Loading...</div>
        }
    }

    return (
        <div className="Container">
            <StyleData>
                <h3>Search or Click Country to Get COVID-19 Vaccine Results</h3>
            </StyleData>
            <input type="text" style={searchBox} onChange={handleSearch} onKeyDown={handleInputDeletion}></input>
            <button style={searchBox} onClick={displayAllData}>Back</button>
            <StyleData>
                <ShowVaccineData />
            </StyleData>
        </div>
    );
}

export default ShowVaccineData;