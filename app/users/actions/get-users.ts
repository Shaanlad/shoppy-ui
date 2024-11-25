"use server"

import { get } from "@/app/common/util/fetch"
import { User } from "../interfaces/user.interface";

export default async function getUsers() {
    console.log("Inside get-users ", getUsers);
    return get<User[]>('users');
}