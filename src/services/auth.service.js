import axios from "axios";
export const loginUser=  (data)=>axios.post('https://shoping-api.vercel.app/auth/login',data);
export const signUpUser=  (data)=>axios.post('https://shoping-api.vercel.app/auth/signup',data);
export const checkUser=  (data)=>axios.post('https://shoping-api.vercel.app/auth/check',data);
export const getAllUser=  ()=>axios.get('https://shoping-api.vercel.app/auth/user');
export const getAllVendor=  ()=>axios.get('https://shoping-api.vercel.app/auth/vendor');