import { create } from "zustand";
import http from "@http";

const useProductStore = create(() => ({
  product: async (page: any, limit: any) => {
    try {
      const res = await http.get(`/products?page=${page}&limit=${limit}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  like: async (id: any) => {
    try {
      const res = await http.post(`/like/${id}`);
      if (res.status === 200) {
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  },
  singleProduct: async (id:any) => {
    try {
      const res = await http.get(`/product/${id}`);
        return res;
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useProductStore;
