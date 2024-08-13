import useApiClient from "@hooks/api/useApiClient";

/* Request to get users data */

const useGetUserData = (): {
  getUserDataRequest: (queryString: string) => Promise<void>;
} => {
  const apiClient = useApiClient();

  const getUserDataRequest = async (queryString: string): Promise<void> => {
    try {
      const response = await apiClient.get(`/user?${queryString}`);

      const responseData = response.data;

      console.warn("user data -->", responseData);
    } catch (error) {}
  };

  return { getUserDataRequest };
};

export default useGetUserData;
