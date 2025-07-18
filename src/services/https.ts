import axios, { AxiosError } from "axios";

export const ENV = process.env;

const http = axios.create({
  baseURL: ENV.REACT_APP_API_URL,
  withCredentials: true,
});

http.interceptors.request.use((request) => {
  const url = window.location.hostname;
  let country = "uzbekistan";
  if (url.endsWith(".uz")) {
    country = "uzbekistan";
  } else if (url.endsWith(".kz")) {
    country = "kazakhstan";
  }
  if (country) {
    request.headers["x-country"] = country;
  }
  return request;
});

// aa11d0c2-6ef1-44a0-8406-6d93e4c9b6ab

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.detail);
      //   toast.error(error.response?.data.detail);
      if (error.response?.status === 500) {
        console.log("Server error - 500");
        // toast.error("Server error - 500");
        //   try {
        //     const newToken = await Auth.Token()
        //   } catch (err) {
        //     //
        //   }
      }
    }
    return Promise.reject(error);
  }
);

export { http };
