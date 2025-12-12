import { useState } from 'react';

export const useFetchRequest = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (url, method, headers, body) => {
        setLoading(true);
        setError(null);
        setResponse(null);
        const startTime = performance.now();

        try {
            const headerObj = headers.reduce((acc, curr) => {
                if (curr.key) acc[curr.key] = curr.value;
                return acc;
            }, {});

            const options = {
                method,
                headers: headerObj,
            };

            if (method !== 'GET' && method !== 'HEAD' && body) {
                options.body = body;
            }

            const res = await fetch(url, options);
            const endTime = performance.now();

            const responseData = await res.text();
            let parsedData;

            try {
                parsedData = JSON.parse(responseData);
            } catch {
                parsedData = responseData;
            }

            const responseObj = {
                status: res.status,
                statusText: res.statusText,
                headers: [...res.headers.entries()],
                data: parsedData,
                time: (endTime - startTime).toFixed(2),
                size: new Blob([responseData]).size,
            };

            setResponse(responseObj);
            return responseObj;
        } catch (err) {
            setError(err.message || 'Network Error');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        response,
        loading,
        error,
        sendRequest
    };
};