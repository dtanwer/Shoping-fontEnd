import { createAsyncThunk } from '@reduxjs/toolkit';
import { banner} from './banner.type';
import { getBanner } from '../../services/banner.service';
export const getBannerHome = createAsyncThunk(
    banner,
  async () => {
    try {
      const { data } =  await getBanner();
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);