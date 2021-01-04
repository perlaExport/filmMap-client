import { Method } from "axios";

export interface callAPIParams {
    url: string, 
    method: Method, 
    token?: boolean, 
	payload?: any, 
	headers?: any,
	queryParams?: object,
    setLoading?: (loadingState: boolean) => void
}
