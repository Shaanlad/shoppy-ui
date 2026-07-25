
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import { cookies } from "next/headers";

export const getHeaders = async () => ({
    Cookie: (await cookies()).toString(),
});

export const post = async (path: string, formData: FormData) => {

    const resp = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            ...(await getHeaders())
            },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    const parsedResp = await resp.json();
    if(!resp.ok) {
        console.log('parsedResp >> ', parsedResp);
        return { error: getErrorMessage(parsedResp) };
    }
    return { error: "" , data: parsedResp};
};

export const get = async <T>(path: string, tags?: string[]) => {

    const res = await fetch(`${API_URL}/${path}`,
        {
        headers: { ...(await getHeaders()) },
        next: { tags }
    }
)
    return res.json() as T;
}