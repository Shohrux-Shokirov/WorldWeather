import { useState } from "react";
import axios from 'axios'

export function useFetch() {
    const [data, setData] = useState({})
    const [dataForecast, setDataForecast] = useState()
    const [location, setLocation] = useState()
    const [error, setError] = useState(null)

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=06b21e289a282535849e92eb92c605a0`;
    const apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=06b21e289a282535849e92eb92c605a0`

    const searchLocation = (event) => {
        event.preventDefault()
        if (event.key === 'Enter') {
            axios.get(apiForecast).then((response) => {
                setDataForecast(response.data)
            })
            axios.get(api).then((response) => {
                setData(response.data)
            })
                .catch((err) => setError(err.response.statusText))
        } else (setError(null))
    }


    return { data, searchLocation, setLocation, error, dataForecast }
}


