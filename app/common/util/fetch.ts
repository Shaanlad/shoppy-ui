
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import { cookies } from "next/headers";

export const getHeaders = async () => ({
    Cookie: (await cookies()).toString(),
});

export const post = async (path: string, data: FormData | object) => {

    const body = data instanceof FormData ? Object.fromEntries(data) : data;
    const resp = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            ...(await getHeaders())
            },
        body: JSON.stringify(body)
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