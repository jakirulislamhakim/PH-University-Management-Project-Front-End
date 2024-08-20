import { jwtDecode } from "jwt-decode";

const decodedJwtToken = (token: string) => {
    const decoded = jwtDecode(token);
    return decoded
};

export default decodedJwtToken;