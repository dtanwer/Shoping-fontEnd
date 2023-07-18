import axios from "axios";
export const getBanner=  ()=>axios.get(`http://localhost:5000/banner`);
export const updateBanner=  (id,data)=>axios.put(`http://localhost:5000/banner/${id}`,data);
export const postBanner=  (data)=>axios.post(`http://localhost:5000/banner`,data);