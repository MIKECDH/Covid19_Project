import React, { useState } from 'react'
import CovidData from './CovidData'
import VaccineData from './VaccineData'
import styled from 'styled-components';

function ShowCountryData() {

    const StyleData = styled.div`
        display: flex;
        justify-content:center;
        font-size: 1.5em;
    `
    const Button = styled.button`
        padding: 5px 12px;
        color: Black;
        font-size: 14px;
        font-weight: 700;
        background-color: ${({ theme }) => theme.color1};
        border: 0px;
        border-radius: 3px;
        appearance: none;
        cursor: pointer;
    `;

    const [casesShow, setCasesShow] = useState(false);
    const [vaccineShow, setVaccineShow] = useState(false);

    function casesOnClick() {
        setCasesShow(true);
        setVaccineShow(false);
    }

    function vaccineOnClick() {
        setVaccineShow(true);
        setCasesShow(false);
    }

    return (
        <div className="Container">
            <StyleData>
                <h3>Please Choose Between Cases or Vaccines to get Results!</h3>
            </StyleData>
            <StyleData>
                <Button onClick={casesOnClick}>Cases</Button>
                <Button onClick={vaccineOnClick}>Vaccines</Button>
            </StyleData>
            {casesShow &&
                <CovidData />}
            {vaccineShow &&
                <VaccineData />}
        </div>
    );
}

export default ShowCountryData;