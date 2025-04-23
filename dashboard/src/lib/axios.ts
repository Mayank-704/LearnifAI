import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie"

const token = Cookies.get("token");

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3051/api",
    headers:{
        "content-Type": "application/json",
        "authorization": `Bearer ${token}`
    },
    withCredentials: true, 
})