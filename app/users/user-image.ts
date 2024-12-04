import { API_URL } from "../common/constants/api"

export const getUserImage = (userId: number) => {
    return `${API_URL}/images/users/${userId}.jpg`;
}