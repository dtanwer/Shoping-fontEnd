import axios from "axios";
export const loginUser=  (data)=>axios.post('http://localhost:5000/auth/login',data);
export const signUpUser=  (data)=>axios.post('http://localhost:5000/auth/signup',data);
export const checkUser=  (data)=>axios.post('http://localhost:5000/auth/check',data);
export const getAllUser=  ()=>axios.get('http://localhost:5000/auth/user');
export const getAllVendor=  ()=>axios.get('http://localhost:5000/auth/vendor');
// export const getUser=(id)=>axios.get(`http://localhost:5000/auth/user/${id}`);