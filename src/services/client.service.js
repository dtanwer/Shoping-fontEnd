import axios from "axios";
export const updateUser=  (data,id)=>axios.put(`https://shoping-api.vercel.app/auth/update/${id}`,data);