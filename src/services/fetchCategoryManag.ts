import axios, { AxiosError } from 'axios';
import { TReqCreateCategory } from '../types/reqTypes';
import { errorHandle } from './errorAxiosHandle';

const fetchCreateCategory1 = async (data:TReqCreateCategory):Promise<any> => {
  try {
    const res = await axios.post<{category:any}>('/user/sign-in', data);

    return res.data.category;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export {
  fetchCreateCategory1
} 