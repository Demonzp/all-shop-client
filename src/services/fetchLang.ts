import { AxiosError } from 'axios';
import { TObjKeyAnyString } from '../types/global';
import axiosServices from './axiosServices';
import { errorHandle } from './errorAxiosHandle';

const fetchLangGlobal = async (data:string):Promise<TObjKeyAnyString> => {
  try {
    const res = await axiosServices.get<TObjKeyAnyString>(`/langs/lang-${data.toLowerCase()}.json`);

    //console.log('res = ', res.data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export {
  fetchLangGlobal
} 