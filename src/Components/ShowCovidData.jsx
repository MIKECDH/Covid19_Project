import React, { useState } from 'react';
import GetCovidData from '../API/GetCovidData';
import styled from 'styled-components';

function ShowCovidData() {

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

    //Used to take value from input and set the query for API GET REQUEST
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
        if(value.target.innerHTML === 'All'){
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
        return <div>{listOfCases}</div>
    }

    //List all Country Names in the API
    function CountryList() {
        const listOfCases = result.map((t) =>
            <h4 key={t} onClick={getValue}>{t[0]}</h4>
        )
        return <div>{listOfCases}</div>
    }

    //Function to check if condition and show correct view
    function ShowCovidData() {
        if (clicked || searched) {
            if (!loading)
                return <CasesList />
            else if (error)
                return <div>{error && "Error"}</div>
            else
                return <div>Loading...</div>
        } else {
            if (!loading)
                return <CountryList />
            else if (error)
                return <div>{error && "Error"}</div>
            else
                return <div>Loading...</div>
        }
    }

    return (
        <>
            <StyleCovidData>
                <h3>Search or Click Country to Get COVID-19 Results</h3>
            </StyleCovidData>
            <input type="text" style={searchBox} onChange={handleSearch} onKeyDown={handleInputDeletion}></input>
            <button onClick={displayAllData} style={searchBox}>Back</button>
            <StyleData>
                <ShowCovidData />
            </StyleData>
        </>
    );
}

export default ShowCovidData;