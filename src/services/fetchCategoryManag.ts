import { AxiosError } from 'axios';
import { ICategory } from '../store/slices/categorys';
import { IReqCreateCategory, IReqCreateSubCategory } from '../types/reqTypes';
import axiosServices from './axiosServices';
import { errorHandle } from './errorAxiosHandle';

const fetchCreateCategory1 = async (data: IReqCreateCategory): Promise<any> => {
  try {
    const res = await axiosServices.post<{ category: any }>('/category/create', data);

    return res.data.category;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchCreateSubCategory = async (data: IReqCreateSubCategory):Promise<any> => {
  try {
    const res = await axiosServices.post<{category: any}>(`/category/create${data.path}`, data);
    return res.data.category;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
}

const fetchCategorys = async (): Promise<ICategory[]> => {
  try {
    const res = await axiosServices.get<{ categorys: ICategory[] }>('/categorys');
    return res.data.categorys;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export {
  fetchCreateCategory1,
  fetchCreateSubCategory,
  fetchCategorys
}