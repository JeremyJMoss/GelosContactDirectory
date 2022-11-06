import { useState, useCallback } from "react";

/**
 * custom hook for handling different types of http requests both POST and GET 
 * @dependencies useState, useCallback
 * @returns isLoading state, error state and a http request sending function that can be
 * called with a requestConfig object and a data handling function. 
 */

const useHttp = function(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    /**
     * @parameters 
     * request config object: {url: contains endpoint string, 
     * method: GET or POST string - default: GET,
     * headers: object with header information in key value pairs - default: {},
     * body: information to be sent via JSON
     * },
     * dataHandlerFunc: contains what to do with data once received from the server.
     */
    const sendRequest = useCallback(async function(requestConfig, dataHandlerFunc){
        try {
            setIsLoading(true);
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });    
                
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            dataHandlerFunc(data);
        }
        catch (err){
            setError(err.message || "Something went wrong!");
        }
        setIsLoading(false);
    },[]);

    return {
        isLoading,
        error,
        sendRequest,
        setError
    };
};

export default useHttp;