import React, { useState } from 'react'
import GetCovidData from '../API/GetCovidData';
import styled from 'styled-components';

function VaccineData() {

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

    function handleSearch(e) {
        setQuery(e.target.value);
        if (e.target.value === "") {
            setSearched(false);
        } else {
            setSearched(true);
        }
    }

    function getValue(value) {
        if (value.target.innerHTML === "All") {
            return;
        }
        setQuery(value.target.innerHTML);
        setClicked(true);
    }

    function displayAllData() {
        setQuery("");
        setClicked(false);
        setSearched(false);
    }

    function handleInputDeletion(e) {
        if (e.key === 'Backspace') {
            setQuery("");
            setClicked(false);
            setSearched(false);
        }
    }

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

    function VaccineCountryList() {
        const listOfVaccines = vaccineResults.map((t) =>
            <div key={t}>
                <h4 onClick={getValue}>{t[0]}</h4>
            </div>
        )
        return <div>{listOfVaccines}</div>
    }

    function ShowVaccineData() {
        if (clicked || searched) {
            if (!loading)
                return <VaccineList />
            else
                return <div>Loading...</div>
        } else {
            if (!loading)
                return <VaccineCountryList />
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

export default VaccineData;