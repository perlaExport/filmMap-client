import callAPI from "./apiCall";

interface callTMDBAPIParams {
    url: string, 
    method: "GET" | "POST" | "PUT" | "DELETE", 
	queryParams?: object,
    setLoading?: (loadingState: boolean) => void
}

const callTMDBAPI = async ({ url, method, queryParams, setLoading}: callTMDBAPIParams) => {
    const { REACT_APP_TMDB_URL, REACT_APP_TMDB_TOKEN } = process.env;
    if (!REACT_APP_TMDB_URL || REACT_APP_TMDB_URL === "" ) return { error: "TMDB url was not provided" };
    if (!REACT_APP_TMDB_TOKEN || REACT_APP_TMDB_TOKEN === "" ) return { error: "TMDB access token was not provided" };

    const { data, status, error } = await callAPI({
        url: `${REACT_APP_TMDB_URL}${url}`,
        method,
        queryParams,
        setLoading,
        headers: {
            "Authorization": `Bearer ${REACT_APP_TMDB_TOKEN}`,
        }
    });
    return { data, status, error };
}

export default callTMDBAPI;