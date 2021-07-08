// if(clicked || searched) {
//     return (
//         <div key={t}>
//             <h1>{t[1].country}</h1>
//             <h3 onClick={getValue}>{t[0]}</h3>
//             <p>Administered: {t[1].administered}</p>
//             <p>People Vaccinated: {t[1].people_vaccinated}</p>
//             <p>People Partially Vaccinated: {t[1].people_partially_vaccinated}</p>
//         </div>
//     )
// } else {
//     return (
//         <div key={t}>
//             <h3 onClick={getValue}>{t[0]}</h3>
//         </div>
//     )
// }

// import React, { useState } from 'react'
// import GetCovidData from '../API/GetCovidData';

// function ShowCountryData() {

//     const [query, setQuery] = useState("");
//     const [searched, setSearched] = useState(false);
//     const [clicked, setClicked] = useState(false);

//     const {
//         error,
//         loading,
//         result,
//         vaccineResults
//     } = GetCovidData(query);

//     function handleSearch(e) {
//         setQuery(e.target.value);
//         if (e.target.value === "") {
//             setSearched(false);
//         } else {
//             setSearched(true);
//         }
//     }

//     function getValue(value) {
//         if (value.target.innerHTML === "All") {
//             return;
//         }
//         setQuery(value.target.innerHTML);
//         setClicked(true);
//     }

//     function displayAllData() {
//         setQuery("");
//         setClicked(false);
//         setSearched(false);
//     }

//     function handleInputDeletion(e) {
//         if (e.key === 'Backspace') {
//             setQuery("");
//             setClicked(false);
//             setSearched(false);
//         }
//     }

//     function CasesList() {
//         const listOfCases = result.map((t) =>
//             <div key={t}>
//                 <h1>{t[1].country}</h1>
//                 <h3 onClick={getValue}>{t[0]}</h3>
//                 <p>Confirmed: {t[1].confirmed}</p>
//                 <p>Recovered: {t[1].recovered}</p>
//                 <p>Deaths: {t[1].deaths}</p>
//             </div>
//         )
//         return <div>{listOfCases}</div>
//     }

//     function VaccineList() {
//         const listOfVaccines = vaccineResults.map((t) =>
//         <div key={t}>
//             <h1>{t[1].country}</h1>
//             <h3 onClick={getValue}>{t[0]}</h3>
//             <p>Administered: {t[1].administered}</p>
//             <p>People Vaccinated: {t[1].people_vaccinated}</p>
//             <p>People Partially Vaccinated: {t[1].people_partially_vaccinated}</p>
//         </div>
//     )
//     return <div>{listOfVaccines}</div>
//     }

//     function CountryList() {
//         const listOfCases = result.map((t) =>
//             <div key={t}>
//                 <h3 onClick={getValue}>{t[0]}</h3>
//             </div>
//         )
//         return <div>{listOfCases}</div>
//     }

//     function VaccineCountryList() {
//         const listOfVaccines = vaccineResults.map((t) =>
//         <div key={t}>
//             <h3 onClick={getValue}>{t[0]}</h3>
//         </div>
//     )
//     return <div>{listOfVaccines}</div>
//     }

//     function ShowVaccineData() {
//         if (clicked || searched) {
//             if(!loading)
//                 return <VaccineList />
//             else
//                 return <div>Loading...</div>
//         } else {
//             if(!loading)
//                 return <VaccineCountryList />
//             else
//                 return <div>Loading...</div>
//         }
//     }

//     function ShowCovidData() {
//         if (clicked || searched) {
//             if(!loading)
//                 return <CasesList />
//             else
//                 return <div>Loading...</div>
//         } else {
//             if(!loading)
//                 return <CountryList />
//             else
//                 return <div>Loading...</div>
//         }
//     }

//     return (
//         <div className="Container">
//             <h1>Search or Click Country to Get COVID-19 Results</h1>
//             <input type="text" onChange={handleSearch} onKeyDown={handleInputDeletion}></input>
//             <div className="ListOfCountries">
//                 <button onClick={displayAllData}>Back</button>
//                 <ShowCovidData />
//             </div>
//         </div>
//     );
// }

// export default ShowCountryData;