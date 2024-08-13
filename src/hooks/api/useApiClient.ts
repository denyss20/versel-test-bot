import createApiClient from "@providers/apiClient";

const useApiClient = () => {
  const apiClient = createApiClient();

  return apiClient;
};

export default useApiClient;
