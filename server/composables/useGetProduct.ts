import { useCms } from "./useCms";
export const useGetProduct = async (
  productId: string,
  prodTypeId?: string | null
) => {
  const { cmsUrl } = useCms();
  if (!prodTypeId) {
    try {
      // Fetch product directly by ID
      console.log(`CALLING API: ${cmsUrl}/products/${productId}`);
      const product = await $fetch<any>(`${cmsUrl}/products/${productId}`);
      return {
        success: true,
        product,
        basePrice: product.productInfo.basePrice,
        productSpecs: product.productSpecs,
      };
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 404,
        message: `Product not found: ${productId}`,
        data: error,
      });
    }
  } else if (prodTypeId) {
    try {
      // Fetch product from globals
      console.log(`CALLING API: ${cmsUrl}/globals/${prodTypeId}`);
      const product = await $fetch<any>(`${cmsUrl}/globals/${prodTypeId}`);
      return {
        success: true,
        product,
        basePrice: product.productInfo.basePrice,
        productSpecs: product.productSpecs,
      };
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 404,
        message: `Product not found: ${productId}`,
        data: error,
      });
    }
  } else {
    throw createError({
      statusCode: 400,
      message: `Unsupported prodTypeId: ${prodTypeId}`,
    });
  }
};
