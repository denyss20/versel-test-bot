import axios from "axios";

// const isDevelopment = import.meta.env.DEV;
const baseURL = "/api/";

const createApiClient = () => {
  const apiClient = axios.create({ baseURL });

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        //
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiClient;
