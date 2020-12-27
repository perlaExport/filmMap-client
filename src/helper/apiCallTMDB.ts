import callAPI from "./apiCall";

interface callTMDBAPIParams {
    url: string, 
    method: "GET" | "POST" | "PUT" | "DELETE", 
	queryParams?: object,
    setLoading?: (loadingState: boolean) => void
}

const callTMDBAPI = async ({ url, method, queryParams, setLoading}: callTMDBAPIParams) => {
    const { REACT_APP_TMDB_URL, REACT_APP_TMDB_KEY } = process.env;
    if (!REACT_APP_TMDB_URL || REACT_APP_TMDB_URL === "" ) return { error: "TMDB url was not provided" };
    if (!REACT_APP_TMDB_KEY || REACT_APP_TMDB_KEY === "" ) return { error: "TMDB access key was not provided" };

    const { data, status, error } = await callAPI({
        url: `${REACT_APP_TMDB_URL}${url}`,
        method,
        queryParams: {
            ...queryParams,
            "api_key": REACT_APP_TMDB_KEY
        },
        setLoading,
    });
    return { data, status, error };
}

export default callTMDBAPI;