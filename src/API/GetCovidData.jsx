import { useState, useEffect } from 'react'
import axios from 'axios'

export default function GetCovidData(query) {

    const [result, setResult] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [vaccineResults, setVaccineResults] = useState([]);

    useEffect(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://covid-api.mmediagroup.fr/v1/cases?country=' + query,
            params: { q: query },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            let a = Object.entries(res.data);
            // console.log(a, b, c);
            setResult(a);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            if (axios.isCancel(err)) return;
            setError(err);
        });
        return () => cancel()
    }, [query]);

    useEffect(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://covid-api.mmediagroup.fr/v1/vaccines?country=' + query,
            params: { q: query },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            let a = Object.entries(res.data);
            // console.log(a, b, c);
            setVaccineResults(a);
        }).catch(err => {
            console.log(err);
            if (axios.isCancel(err)) return;
            setError(err);
        });
        return () => cancel()
    }, [query]);


    return { error, loading, result, vaccineResults }
}
