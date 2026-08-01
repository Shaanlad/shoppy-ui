import { Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import { getProductImage } from "../product-image";

interface SingleProductProps {
    params: Promise<{
        productId: string
    }>
}

export default async function SingleProduct({ params }: SingleProductProps) {
    const { productId } = await params;
    const product  = await getProduct(+productId);

    return (
            <Stack gap={3} marginBottom={"2rem"}>
                {/* <Typography variant="h4" component="h4" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {product.description}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    ${product.price.toFixed(2)}
                </Typography> */}
                <Typography variant="h4">
                    {product.name}
                </Typography>
                {
                    product.imageExists && (
                        <img 
                            src={getProductImage(product.id)}
                            alt={product.name}
                            width="0"
                            height="0"
                            className="w-auto md:w-1/2 h-auto"
                            sizes="100vw"
                        />                        
                    )
                }
                <Typography variant="body1" gutterBottom>
                    {product.description}
                </Typography>
                <Typography variant="h4">
                    ${product.price.toFixed(2)}
                </Typography>
            </Stack>
        
    )
}