import { jwtDecode } from "jwt-decode";

export const verifyAdmin = (token: string) => {
    const user: any = jwtDecode(token);
    return user.admin
}

export const verifyTokenExp = (token: string) => {
    const user: any = jwtDecode(token);
    return user.exp
}