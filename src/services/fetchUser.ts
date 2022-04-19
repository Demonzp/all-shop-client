import axios, { AxiosError } from 'axios';
import { IUserBase } from '../store/slices/user';
import { TReqUserReg, TReqUserSignin } from '../types/reqTypes';
import { TResSuccess, TResUser } from '../types/resTypes';
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

const fetchUserSignin = async (data:TReqUserSignin):Promise<IUserBase> => {
  try {
    const res = await axios.post<TResUser>('/user/sign-in', data);

    return res.data.user;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export {
  fetchUserSignin,
  fetchUserReg
} 