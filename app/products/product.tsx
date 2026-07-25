import { Card, Typography } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";

interface ProductProps {
    product: IProduct
}

export default function Product({product}: ProductProps) {
    return (
        <Card className="p-4" elevation={0} sx={{ bgcolor: "white", border: "1.5px solid #e0e0e0", borderRadius: "8px" }}>
            <Typography variant="h5" component="h5" gutterBottom>
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