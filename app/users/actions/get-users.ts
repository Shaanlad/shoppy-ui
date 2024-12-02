"use server"

import { get } from "@/app/common/util/fetch"
import { User } from "../interfaces/user.interface";

export default async function getUsers() {
    return get<User[]>('users');
}