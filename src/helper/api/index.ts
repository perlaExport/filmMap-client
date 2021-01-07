import { Method } from "axios";
import callAPI from "./APICall";
import callTMDBAPI from "./APICallTMDB";

export interface callAPIParams {
  url: string;
  method: Method;
  token?: boolean;
  payload?: any;
  headers?: any;
  queryParams?: object;
  setLoading?: (loadingState: boolean) => void;
}

export { callTMDBAPI };

export default callAPI;
