import {create} from "zustand"
import { axiosInstance } from "../../lib/axios.ts"           
import Cookies from "js-cookie"
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface AuthUser{
  id?: string;
  fullName: string;
  email: string;
  password: string;
}

interface AuthStore{
  authUser: (Omit<AuthUser, "password"> & { token?: string }) | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  setAuthUser: (user: (Omit<AuthUser, "password"> & { token?: string }) | null) => void;
  checkAuth: ()=>Promise<void>;
  signup: (data: AuthUser) =>Promise<void>;
  login: (data: {email: string; password: string})=>Promise<void>;
  logout: ()=>Promise<void>

}


export const useAuthStore = create<AuthStore>((set) => ({
  authUser: JSON.parse(localStorage.getItem("authUser") || "null"),
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  setAuthUser: (user) => set({ authUser: user }),

  checkAuth: async () => {
    set({isCheckingAuth: true})
    try {
      // const res = await axiosInstance.get("/auth/check");
      const storedUser = localStorage.getItem("authUser")
      set({ authUser: JSON.parse(storedUser || "null") });
    } catch (error) {
      console.log("Error in check-auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data: AuthUser) => {
    set({isSigningUp: true})
    try {
      const res = await axiosInstance.post<Omit<AuthUser, "password"> & { token?: string }>(
        "/auth/signup",
        data
      );
      console.log(res)
      Cookies.set("token", res.data.token!, { expires: 10, secure: true });
      set({authUser: res.data});
      localStorage.setItem("authUser",JSON.stringify(res.data));
      // localStorage.setItem("authUser", JSON.stringify(res.data)); // Save auth state locally
      toast.success("Signup succesfully")
    } catch (error) {
     
      console.log(error)
      toast.error("Signup failed")
    }finally{
      set({isSigningUp: false})
    }
  },
  login: async (data: { email: string; password: string }) => {
    // Add logic to handle login
    set({isLoggingIn: true})
    try {
      console.log("here in login")
      const res = await axiosInstance.post<Omit<AuthUser, "password"> & { token?: string }>(
        "/auth/login",
        data,
        { withCredentials: true }
      );
      console.log("res.data in login method = ", res.data);

      Cookies.set("token", res.data.token!, { expires: 10, secure: true });

      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      console.log("res.data = ", res.data);
      toast.success("Login successful!");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message || "Login failed");
      }
        }finally {
          set({ isLoggingIn: false });
        }
    
  },
  logout: async () => {
    // Add logic to handle logout
    try{
      set({authUser: null});
      localStorage.removeItem("authUser");
      Cookies.remove("token");
      await axiosInstance.post("/auth/logout")
      toast.success("Logged out successfully!");
    } catch (error) {
      if (error) {
        toast.error("Logout failed");
      }
      console.error("Error in logout:", error);
    } finally {
      if (localStorage.getItem("authUser") === null) {
        console.log("Logged out successfully!");
      }
    }
  },
}));