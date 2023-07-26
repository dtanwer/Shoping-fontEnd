import axios from "axios";
const url=process.env.REACT_APP_SERVER_URL;
export const loginUser=  (data)=>axios.post(`${url}/auth/login`,data);
export const signUpUser=  (data)=>axios.post(`${url}/auth/signup`,data);
export const checkUser=  (data)=>axios.post(`${url}/auth/check`,data);
export const getAllUser=  ()=>axios.get(`${url}/auth/user`);
export const getAllVendor=  ()=>axios.get(`${url}/auth/vendor`);
// export const getUser=(id)=>axios.get(`http://localhost:5000/auth/user/${id}`);