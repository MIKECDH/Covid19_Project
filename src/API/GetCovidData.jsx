import { useState, useEffect } from 'react'
import axios from 'axios'

export default function GetCovidData(query) {

    const [result, setResult] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [vaccineResults, setVaccineResults] = useState([]);

    // This useEffect is to Call the COVID DATA 
    useEffect(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://covid-api.mmediagroup.fr/v1/cases?country=' + query,
            params: { q: query },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            // Since the JSON is an Object of Object use Object.entries to return an array of Key, Value Pairs
            let data = Object.entries(res.data);
            setResult(data);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            if(err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if(err.request) {
                console.log(err.request);
            } else {
                console.log("Error: ", err.message);
            }
            if (axios.isCancel(err)) return;
            setError(err);
        });
        return () => cancel()
    }, [query]);


    // This useEffect is to Call the VACCINE DATA
    useEffect(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://covid-api.mmediagroup.fr/v1/vaccines?country=' + query,
            params: { q: query },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            // Since the JSON is an Object of Object use Object.entries to return an array of Key, Value Pairs
            let data = Object.entries(res.data);
            setVaccineResults(data);
            setLoading(false);
        }).catch(err => {
            if(err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if(err.request) {
                console.log(err.request);
            } else {
                console.log("Error: ", err.message);
            }
            console.log(err);
            if (axios.isCancel(err)) return;
            setError(err);
        });
        return () => cancel()
    }, [query]);


    return { error, loading, result, vaccineResults }
}
