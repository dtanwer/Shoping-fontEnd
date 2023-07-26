import { createSlice } from "@reduxjs/toolkit";
import { getBannerHome } from "./banner.action";
const initialState={
    banner:{},
    loading:false,
    error:{}
}

const bannerSlice=createSlice({
    name:'banner',
    initialState,
    reducers:{
        setBanner:(state,action)=>{
            state.banner=action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBannerHome.fulfilled, (state, action) => {
                state.banner = action.payload;
                state.loading = false;
            })
            .addCase(getBannerHome.pending, (state) => {
                state.loading=true;
            })
            .addCase(getBannerHome.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
    }
})
export const {setBanner} = bannerSlice.actions;
export default bannerSlice.reducer;