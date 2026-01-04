export const useOrderApi = () => {
  const config = useRuntimeConfig();
  const orderUrl = config.orderUrl;

  if (!orderUrl) {
    throw new Error("Order API not configured");
  }

  return {
    orderUrl,
  };
};
