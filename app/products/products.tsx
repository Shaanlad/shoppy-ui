import { Grid2 } from "@mui/material";
import getProducts from "./actions/get-products";
import Product from "./product";

export default async function Products() {
    const products = await getProducts();
    console.log("products >> ", products);

    return (
        <Grid2 container spacing={2} className="p-4">
            {products.map((product) => (
                <Grid2 key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} />
                    {/* <div className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
                    </div> */}
                </Grid2>
            ))}
        </Grid2>
    )
}