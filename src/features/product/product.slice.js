import { createSlice } from "@reduxjs/toolkit";
import { getTopProducts,getProducts,getSearchProduct } from "./product.action";
const initialState={
    topProducts:[],
    products:[],
    loading:false,
    error:""
}

const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopProducts.fulfilled, (state, action) => {
                state.topProducts = action.payload;
                state.loading = false;
            })
            .addCase(getTopProducts.pending, (state) => {
                state.loading=true;
            })
            .addCase(getTopProducts.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(getProducts.pending, (state) => {
                state.loading=true;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
            .addCase(getSearchProduct.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(getSearchProduct.pending, (state) => {
                state.loading=true;
            })
            .addCase(getSearchProduct.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
    }
})

export const {setProducts} = productSlice.actions;
export default productSlice.reducer;