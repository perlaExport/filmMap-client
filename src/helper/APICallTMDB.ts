import callAPI from "./APICall";
import { callAPIParams } from "./IAPICall";

const callTMDBAPI = async ({
  url,
  method,
  queryParams,
  setLoading,
}: callAPIParams) => {
  const { REACT_APP_TMDB_URL, REACT_APP_TMDB_KEY } = process.env;
  if (!REACT_APP_TMDB_URL || REACT_APP_TMDB_URL === "")
    return { error: "TMDB url was not provided" };
  if (!REACT_APP_TMDB_KEY || REACT_APP_TMDB_KEY === "")
    return { error: "TMDB access key was not provided" };

  const { data, status, error } = await callAPI({
    url: `${REACT_APP_TMDB_URL}${url}`,
    queryParams: {
      ...queryParams,
      api_key: REACT_APP_TMDB_KEY,
    },
    method,
    setLoading,
  });
  return { data, status, error };
};

export default callTMDBAPI;
