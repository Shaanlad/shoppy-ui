"use server"

import { revalidateTag } from "next/cache";
import { post } from "../../common/util/fetch"

export default async function createUser(formData:FormData) {
    const response = await post("users", formData);
    revalidateTag("users");
    return response;
}