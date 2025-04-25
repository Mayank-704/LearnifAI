import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie"

const token = Cookies.get("token");

const baseURL = import.meta.env.MODE === "development"
    ? "http://localhost:3051/api"
    : "https://learnifai-1.onrender.com/api";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        "content-Type": "application/json",
        "authorization": `Bearer ${token}`
    },
    withCredentials: true, 
});