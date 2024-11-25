"use server"
import { FormError } from "@/app/common/interfaces/form-error.interface"
import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/util/errors";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";

export default async function login(
    _prevState: FormError,
    formData: FormData
) {  
    const resp = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(Object.fromEntries(formData))
    });
    const parsedResp = await resp.json();
    if(!resp.ok) {
        console.log(parsedResp);
        return { error: getErrorMessage(parsedResp) };
    }
    setAuthCookie(resp);
    redirect("/");  
}

const setAuthCookie = async (response: Response) => {
    const setCookieHeader = response.headers.get("Set-Cookie");
    if(setCookieHeader) {
        const token = setCookieHeader.split(';')[0].split('=')[1];
        (await cookies()).set({
            name: AUTHENTICATION_COOKIE,
            value: token,
            secure: true,
            httpOnly: true,
            expires: new Date(jwtDecode(token).exp! * 1000),
        });
    }
};