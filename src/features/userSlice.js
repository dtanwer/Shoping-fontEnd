// import { createSlice } from "@reduxjs/toolkit";

// const initialState={
//     // login:false,
//     user:{},
//     totalInCart:0,
//     productPrice:0,
//     loading:false,
// }

// const authSlice=createSlice({
//     name:'user',
//     initialState,
//     reducers:{
//         setLogin:(state,action)=>{
//             console.log(action)
//             state.login=true;
//             state.user=action.payload;
//         },
//         setLogOut:(state)=>{
//             state.login=false;
//             state.user={};
//         },
//         setUser:(state,action)=>{
//             state.user=action.payload;
//         },
//         setAddCart:(state,action)=>{
//             state.user.cart.push(action.payload);
//         },
//         removeUserCart:(state,action)=>{
//             state.user.cart=state.user.cart.filter((item)=>item.id!==action.payload.id);
//         },
//         setAddress:(state,action)=>{
//             state.user.address.push(action.payload);
//         },
//         setLoading:(state,action)=>{
//             state.loading=action.payload;
//         },
//         setTotalCart:(state,action)=>{
//             state.totalInCart+=action.payload;
//         },
//         setProductPrice:(state,action)=>{
//             state.productPrice=action.payload;
//         },
//         setCartQuantity:(state,action)=>{
//             state.user.cart=state.user.cart.map((item)=>{
//                 if(item.id===action.payload.id)
//                 {
//                     return action.payload;
//                 }
//                 return item;
//             });
//         },
//     }
// })

// export const {setUser,setAddCart,setAddress,removeUserCart,setTotalCart,setProductPrice,setCartQuantity,setLoading} = authSlice.actions;
// export default authSlice.reducer;