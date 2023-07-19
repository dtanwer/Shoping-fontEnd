import { createSlice } from "@reduxjs/toolkit";

const initialState={
    login:false,
    user:{},
    products:[],
    totalInCart:0,
    productPrice:0,
    banner:{},
    showModel:false,
}

const authSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            console.log(action)
            state.login=true;
            state.user=action.payload;
        },
        setLogOut:(state)=>{
            console.log("logining out!!")
            state.login=false;
            state.user={};
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setBanner:(state,action)=>{
            state.banner=action.payload;
        },
        setAddCart:(state,action)=>{
            // console.log('Pushing Data',action.payload)
            state.user.cart.push(action.payload);
        },
        removeUserCart:(state,action)=>{
            // console.log('Pushing Data',action.payload)
            state.user.cart=state.user.cart.filter((item)=>item.id!==action.payload.id);
        },
        setAddress:(state,action)=>{
            // console.log('Pushing Data',action.payload)
            state.user.address.push(action.payload);
        },
        setShowModel:(state,action)=>{
            state.showModel=action.payload;
        },
        setProducts:(state,action)=>{
            state.products=action.payload;
        },
        setTotalCart:(state,action)=>{
            state.totalInCart+=action.payload;
        },
        setProductPrice:(state,action)=>{
            state.productPrice=action.payload;
        },
        setCartQuantity:(state,action)=>{
            state.user.cart=state.user.cart.map((item)=>{
                if(item.id===action.payload.id)
                {
                    return action.payload;
                }
                return item;
            });
            console.log(state.user.cart)
        },

        
    }
})

export const {setLogOut,setLogin,setUser,setProducts,setAddCart,setAddress,removeUserCart,setTotalCart,setProductPrice,setCartQuantity,setBanner,setShowModel} = authSlice.actions;
export default authSlice.reducer;