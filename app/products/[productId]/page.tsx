import { Grid2, Stack, Typography } from "@mui/material";
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
        <Grid2 container marginBottom={"2rem"} columnSpacing={4} rowGap={3}>
            {product.imageExists && (
            <Grid2 size={{ xs: 12, md: 6 }}>
                
                <img
                    src={getProductImage(product.id)}
                    alt={product.name}
                    width={0}
                    height={0}
                    className="w-full sm:w-3/4 h-auto"
                    sizes="100vw"
                />                
            </Grid2>
            )}
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Stack gap={3}>
                    <Typography variant="h3">
                        {product.name}
                    </Typography>                    
                    <Typography>
                        {product.description}
                    </Typography>
                    <Typography variant="h4">
                        ${product.price.toFixed(2)}
                    </Typography>
                </Stack>
            </Grid2>
        </Grid2>
            
    )
}