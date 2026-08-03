"use client"
import revalidateProducts from "./actions/revalidate-products";
import { Product as IProduct } from "./interfaces/product.interface";
import Product from "./product";
import { Grid2 } from "../dark.theme";
import { useEffect } from "react";
import { API_URL } from "../common/constants/api";
import { io, Socket } from "socket.io-client";
import getAuthentication from "../auth/actions/get-authentication";

interface ProductGridProps {
    products: IProduct[];
}

export default function ProductsGrid({products}: ProductGridProps) {
    
    useEffect(() => {
        let socket: Socket;
        const createSocket = async () => {
        console.log("products from ProductsGrid >> ", products);

        socket = io(API_URL!, {
            auth: {
                Authentication: await getAuthentication(),
            }
        });

        //revalidate cache when a product is updated
        socket.on('productUpdated', () => {
            revalidateProducts();
            });
        };
        createSocket();

        return () => {
            socket?.disconnect();
        };
    }, []);

    return (
        <Grid2 container spacing={3} sx={{height: "85vh", overflowY: "scroll"}}>
            {products.map((product) => (
                <Grid2 key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
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