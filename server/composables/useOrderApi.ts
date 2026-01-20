export const useOrderApi = () => {
  const orderUrl = `https://app-backend-services-drukarnia-projektow-staging.azurewebsites.net`;

  if (!orderUrl) {
    throw new Error("Order API not configured");
  }

  return {
    orderUrl,
  };
};
