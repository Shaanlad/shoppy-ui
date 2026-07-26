import { Card, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import Image from "next/image";
import { API_URL } from "../common/constants/api";

interface ProductProps {
    product: IProduct
}

export default function Product({product}: ProductProps) {
    return (
        <Card className="p-4" elevation={0} sx={{ bgcolor: "white", border: "1.5px solid #e0e0e0", borderRadius: "8px" }}>
            <Stack gap={3}>
                <Typography variant="h5" component="h5" gutterBottom>
                {product.name}
                </Typography>
                {
                product.imageExists && (
                    <Image 
                        src={`${API_URL}/products/${product.id}.jpeg`}
                        alt={product.name}
                        width="0"
                        height="0"  
                        className="w-full h-auto mb-4"      
                        sizes="100vw"       
                    />
                    )
                }
                <Typography variant="body1" gutterBottom>
                    {product.description}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    ${product.price.toFixed(2)}
                </Typography>
            </Stack>
        </Card>
    )
}