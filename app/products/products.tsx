import getProducts from "./actions/get-products";
import ProductsGrid from "./products-grid";

interface ProductsProps {
    search?: string;
}

export default async function Products({ search }: ProductsProps) {
    const products = await getProducts();
    const filteredProducts = search
        ? products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        : products;

    return <ProductsGrid products={filteredProducts} />
}