"use server"

import { post } from "../../common/util/fetch";

export default async function createProduct(formData: FormData) {
    // const response = await fetch("http://localhost:8080/api/products", {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //         "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    //     }
    // });

    // if (!response.ok) {
    //     throw new Error(`Failed to create product: ${response.statusText}`);
    // }

    // return response.json();
    return post("products", formData);
}