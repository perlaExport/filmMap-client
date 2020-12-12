import axios from "axios";

interface callAPIParams {
    url: string, 
    method: "GET" | "POST" | "PUT" | "DELETE", 
    token?: "string", 
    payload?: any, 
    setLoading?: (loadingState: boolean) => void
}

const callAPI = async ({ url, method, token, payload, setLoading }: callAPIParams) => {
	let headers = {};
	if (!!token) headers = { Authorization: localStorage.getItem("token") };
	!!setLoading && setLoading(true);
	try {
		const res = await axios({ method, url, data: payload, headers });
        !!setLoading && setLoading(false);
		return { data: res.data, error: null, status: res.status };
	} catch (error) {
		!!setLoading && setLoading(false);
		return { data: null, error: error.response?.data, status: error.response?.status };
	}
};

export default callAPI;