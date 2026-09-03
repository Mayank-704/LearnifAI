import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie"

const token = Cookies.get("token");

const baseURL = import.meta.env.VITE_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        "content-Type": "application/json",
        "authorization": `Bearer ${token}`
    },
    withCredentials: true, 
});