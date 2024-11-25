
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import { cookies } from "next/headers";

// const getHeaders = () => ({
//     Cookie: cookies().toString(),
// });

export const post = async (path: string, formData: FormData) => {

    const resp = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 
            // ...getHeaders()

        },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    const parsedResp = await resp.json();
    if(!resp.ok) {
        console.log(parsedResp);
        return { error: getErrorMessage(parsedResp) };
    }
    return { error: "" };
};

export const get = async (path: string) => {
    const res = await fetch(`${API_URL}/${path}`, 
    //     {
    //     headers: { ...getHeaders() }     
    // }
)
    return res.json();
}