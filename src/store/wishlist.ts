import { create } from "zustand";
import http from "@http";

const useWishStore = create(() => ({
    wishlist: async(page:any , limit:any)=>{
        try{
            const res = await http.get(`/wishlist?page=${page}&limit=${limit}`)
            if(res.status === 200){
                return res
            }
        }catch(err){
            console.log(err)
        }
    },
}))

export default useWishStore;