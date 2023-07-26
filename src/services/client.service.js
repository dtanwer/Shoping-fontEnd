import axios from "axios";
const url=process.env.REACT_APP_SERVER_URL;
export const updateUser=  (data,id)=>axios.put(`${url}/auth/update/${id}`,data);
export const updateClientPhone=  (data,id)=>axios.put(`${url}/auth/phone/${id}`,data);