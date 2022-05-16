import { AxiosError } from 'axios';
import { IUserBase } from '../store/slices/user';
import { TReqUserReg, TReqUserSignin } from '../types/reqTypes';
import { IResUser, TResSuccess } from '../types/resTypes';
import axiosServices from './axiosServices';
import { errorHandle } from './errorAxiosHandle';

const fetchGetUser = async ():Promise<IResUser> =>{
  try {
    const res = await axiosServices.get<IResUser>('/user');
    //const user:IUserBase = {...(res.data.user as IUserBase)};
    //user.token = res.data.updatedToken!;
    return res.data;
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
    const res = await axiosServices.post<IResUser>('/user/sign-in', data);
    const user:IUserBase = {...(res.data.user as IUserBase)};

    user.token = res.data.updatedToken!;

    return user;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export {
  fetchGetUser,
  fetchUserSignin,
  fetchUserReg
} 