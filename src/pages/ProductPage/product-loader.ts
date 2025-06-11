import type { LoaderFunctionArgs } from "react-router";
import { productService } from "../../api/products";

async function productLoader({ params }: LoaderFunctionArgs) {
  try {
    const data = await productService.getProductByKey(params.key ?? "");
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default productLoader;
