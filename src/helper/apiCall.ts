import axios from "axios";

interface callAPIParams {
    url: string, 
    method: "GET" | "POST" | "PUT" | "DELETE", 
    token?: boolean, 
	payload?: any, 
	headers?: any,
	queryParams?: object,
    setLoading?: (loadingState: boolean) => void
}

const convertObjToQueryString = (objectQuery: object) => {
	if (objectQuery === {} ) return "";
	let queryString = "";
	for (const [key, value] of Object.entries(objectQuery)) {
		queryString += queryString === "" ? "?" : "&"
		queryString += `${key}=${value}`;
	}
	return queryString;
}

const callAPI = async ({ url, method, token, payload, setLoading, headers: passedHeaders, queryParams}: callAPIParams) => {
	let headers = {};
	let requestURL = url;

	if(!!passedHeaders) headers = passedHeaders;
	if (!!token) headers = { ...headers, Authorization: `Bearer ${localStorage.getItem("token")}` };

	if(!!queryParams && queryParams !== {}) requestURL += convertObjToQueryString(queryParams);

	!!setLoading && setLoading(true);
	try {
		const res = await axios({ method, url: requestURL, data: payload, headers });
        !!setLoading && setLoading(false);
		return { data: res.data, error: null, status: res.status };
	} catch (error) {
		!!setLoading && setLoading(false);
		return { data: null, error: error.response?.data, status: error.response?.status };
	}
};

export default callAPI;