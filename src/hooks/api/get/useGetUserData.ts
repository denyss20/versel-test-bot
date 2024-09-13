import useApiClient from "@hooks/api/useApiClient";

import { useAppContext } from "@context/useAppContext";

/* Request to get users data */

const useGetUserData = (): {
  getUserDataRequest: (queryString: string) => Promise<void>;
} => {
  const { setUserData } = useAppContext();
  const apiClient = useApiClient();

  const getUserDataRequest = async (queryString: string): Promise<void> => {
    try {
      const response = await apiClient.get(`/user?${queryString}`);

      const responseData = response.data;

      console.warn("user data -->", responseData);

      setUserData(responseData);
    } catch (error) {
      console.warn({ error });
    }
  };

  return { getUserDataRequest };
};

export default useGetUserData;
