import React, { useState, useEffect, useReducer } from 'react';

export default function useFetch(url: string) {
    const [data, setData] = useState<any | null>({});
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(url);
                const result = await response.json();
                console.log(result);
                setData(result);
            } 
            catch (error) {
                setError((error as Error).message);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, isLoading, error}
}