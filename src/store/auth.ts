import { create } from "zustand";
import http from "@http";
import { saveDataToCookie } from "@token-service";


const useAuthStore = create(() => ({
  signin: async (payload: any) => {
    try {
      const response = await http.post("/login", payload);
      if (response.status === 200) {
        saveDataToCookie("token", response?.data?.access_token);
        return response
      }
      
    } catch (err) {
      console.error(err);
    }
  },
  signup: async (payload:any) => {
    try{
      const res = await http.post("/register" , payload)
      if(res.status === 200){
        return res
      }
    }catch(err){
      console.log(err)
    }
  },
  verify: async (payload: any) => {
    try {
      const res = await http.post(`/verify?email=${payload.email}&otp=${payload.otp}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  }
}));

export default useAuthStore;