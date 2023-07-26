import { createSlice } from "@reduxjs/toolkit";

const initialState={
    showModel:false,
}

const loginModelSlice=createSlice({
    name:'loginModel',
    initialState,
    reducers:{
        setShowModel:(state,action)=>{
            state.showModel=action.payload;
        }
    }
})

export const {setShowModel} = loginModelSlice.actions;
export default loginModelSlice.reducer;