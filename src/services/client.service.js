import axios from "axios";
export const updateUser=  (data,id)=>axios.put(`http://localhost:5000/auth/update/${id}`,data);