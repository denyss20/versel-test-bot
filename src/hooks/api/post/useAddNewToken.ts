import useApiClient from "@hooks/api/useApiClient";

import { useAppContext } from "@context/useAppContext";

/**
 * Hook that allows to manually change an ammo count
 **/
function useAddNewToken() {
  const apiClient = useApiClient();

  const { setUserData, setTokensLiquidity } = useAppContext();

  const addNewTokenRequest = async (taps: number): Promise<any | undefined> => {
    try {
      const response = await apiClient.post("/tap", JSON.stringify({ taps }), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      if (data) {
        console.log("add new token data -->", data);

        setUserData(data.user);
        setTokensLiquidity(data.world.tokens);
      }
    } catch (error: any) {
      console.log({ error }, "new token 1");
    }
  };

  return { addNewTokenRequest };
}

export default useAddNewToken;
