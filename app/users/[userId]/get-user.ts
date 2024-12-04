import { get } from "@/app/common/util/fetch";
import { User } from "../interfaces/user.interface";


export default async function getUser(userId: number) {
        return get<User>(`users/${userId}`);
    
}