import { Card, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";

interface ProductProps {
    product: IProduct
}

export default function Product({product}: ProductProps) {
    return (
        <Card className="p-4">
            <Typography variant="h4" component="h2" gutterBottom>
                {product.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {product.description}
            </Typography>
            <Typography variant="h6" color="textSecondary">
                ${product.price.toFixed(2)}
            </Typography>
        </Card>
    )
}