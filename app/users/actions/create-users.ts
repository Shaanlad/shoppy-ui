"use server"

import { revalidateTag } from "next/cache";
import { getHeaders, post } from "../../common/util/fetch"
import { API_URL } from "@/app/common/constants/api";

export default async function createUser(formData:FormData) {
    const response = await post("users", formData);
    const userImage = formData.get('image');
    console.log('Inside createUser -- userImage >> ', userImage);
    
    if(userImage instanceof File && !response.error) {
        await uploadUserImage(response.data.id, userImage);
    }
    revalidateTag("users");
    return response;
}


async function uploadUserImage(userId: number, file: File) {
    const formData = new FormData();
    formData.append("image", file);
    await fetch(`${API_URL}/users/${userId}/image`, {
        body: formData,
        method: 'POST',
        headers: getHeaders()
    })
}