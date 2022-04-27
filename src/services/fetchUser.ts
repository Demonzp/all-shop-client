import { AxiosError } from 'axios';
import { IUserBase } from '../store/slices/user';
import { TReqUserReg, TReqUserSignin } from '../types/reqTypes';
import { TResSuccess, TResUser } from '../types/resTypes';
import axiosServices from './axiosServices';
import { errorHandle } from './errorAxiosHandle';

const fetchGetUser = async ():Promise<IUserBase> =>{
  try {
    const user = await axiosServices.get<{user:IUserBase}>('/user');
    return user.data.user;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchUserReg = async (data:TReqUserReg):Promise<string> => {
  try {
    const res = await axiosServices.post<TResSuccess>('/user', data);

    //console.log('res = ', res.data);
    return res.data.success;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchUserSignin = async (data:TReqUserSignin):Promise<IUserBase> => {
  try {
    const res = await axiosServices.post<TResUser>('/user/sign-in', data);

    return res.data.user;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export {
  fetchGetUser,
  fetchUserSignin,
  fetchUserReg
} 