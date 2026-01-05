import axios from "axios";
export const api = axios.create({
    baseURL: "https://api.api-onepiece.com/v2",
    headers: {
        "Content-Type": "application/json",
    },
});