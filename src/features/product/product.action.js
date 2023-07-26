import { createAsyncThunk } from '@reduxjs/toolkit';
import { topProduct,products,searchProduct} from './product.type';
import { getProductsByCategory, getProductsForUsers, getTopProductForUser, searchProducts, } from '../../services/product.service';
export const getTopProducts = createAsyncThunk(
    topProduct,
  async () => {
    try {
      const { data } =  await getTopProductForUser();
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);
export const getSearchProduct = createAsyncThunk(
  searchProduct,
  async (query) => {
    try {
      const { data } =  await searchProducts(query);
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);
export const getProducts = createAsyncThunk(
  products,
  async (category="all") => {
    console.log(category)
    try {
      const { data } = category==='all'? await getProductsForUsers():await getProductsByCategory(category);
     return data;
  } catch (error) {
      console.log(error)
  }
  }
);