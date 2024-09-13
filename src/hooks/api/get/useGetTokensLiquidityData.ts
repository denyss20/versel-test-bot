import useApiClient from "@hooks/api/useApiClient";

import { useAppContext } from "@context/useAppContext";

/* Request to get users data */

const useGetTokensLiquidityData = (): {
  getTokensLiquidityDataRequest: () => Promise<void>;
} => {
  const apiClient = useApiClient();
  const { setTokensLiquidity } = useAppContext();

  const getTokensLiquidityDataRequest = async (): Promise<void> => {
    try {
      const response = await apiClient.get("/world");

      const responseData = response.data;

      console.warn("ALL TOKENS: -->", responseData);
      setTokensLiquidity(responseData.world);
    } catch (error) {}
  };

  return { getTokensLiquidityDataRequest };
};

export default useGetTokensLiquidityData;
