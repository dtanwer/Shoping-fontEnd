import axios from "axios";
const url=process.env.REACT_APP_SERVER_URL;
export const getBanner=  ()=>axios.get(`${url}/banner`);
export const updateBanner=  (id,data)=>axios.put(`${url}/banner/${id}`,data);
export const postBanner=  (data)=>axios.post(`${url}/banner`,data);