import React, { useState } from 'react';
import GetCovidData from '../API/GetCovidData';
import styled from 'styled-components';

function CovidData() {

    const StyleCovidData = styled.div`
        display: flex;
        justify-content:center;
        font-size: 1em;
    `

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
        result,
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

    function CasesList() {
        const listOfCases = result.map((t) =>
            <div key={t}>
                <h3>{t[1].country}</h3>
                <h4 onClick={getValue}>{t[0]}</h4>
                <p>Confirmed: {t[1].confirmed}</p>
                <p>Recovered: {t[1].recovered}</p>
                <p>Deaths: {t[1].deaths}</p>
            </div>
        )
        return <StyleData>{listOfCases}</StyleData>
    }

    function CountryList() {
        const listOfCases = result.map((t) =>
            <div key={t}>
                <h4 onClick={getValue}>{t[0]}</h4>
            </div>
        )
        return <StyleData>{listOfCases}</StyleData>
    }

    function ShowCovidData() {
        if (clicked || searched) {
            if (!loading)
                return <CasesList />
            else
                return <div>Loading...</div>
        } else {
            if (!loading)
                return <CountryList />
            else
                return <div>Loading...</div>
        }
    }

    return (
        <div className="Container">
            <StyleCovidData>
                <h3>Search or Click Country to Get COVID-19 Results</h3>
            </StyleCovidData>
            <div className="searchBox">
            <input type="text" style={searchBox} onChange={handleSearch} onKeyDown={handleInputDeletion}></input>
            <button onClick={displayAllData} style={searchBox}>Back</button>
            </div>
            <ShowCovidData />
        </div>
    );
}

export default CovidData;