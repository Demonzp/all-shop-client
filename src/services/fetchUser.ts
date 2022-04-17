import axios, { AxiosError } from 'axios';
import { TResSuccess } from '../types/resTypes';
import { TReqUserReg } from '../types/user';
import { errorHandle } from './errorAxiosHandle';

const fetchUserReg = async (data:TReqUserReg):Promise<string> => {
  try {
    const res = await axios.post<TResSuccess>('/user', data);

    //console.log('res = ', res.data);
    return res.data.success;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export {
  fetchUserReg
} 