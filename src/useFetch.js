import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(url)
        .then((response) => setData(response.data))
        .catch((error) => setError(error))
        .finally(setLoading(false));
    },[url]);

    function refresh(url1)
    {
        setLoading(true);
        setError(null);
        axios.get(url1)
        .then((response) => setData(response.data))
        .catch((error) => setError(error))
        .finally(setLoading(false));
    }
    
    return ({data, loading, error, refresh})
}

export default useFetch;