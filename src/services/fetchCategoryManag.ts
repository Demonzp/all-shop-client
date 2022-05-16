import { AxiosError } from 'axios';
import { ICategory } from '../store/slices/categorys';
import { IReqCreateCategory, IReqCreateSubCategory, IReqEditCategory, IReqUpDownCategory, TReqDelCategory, TReqTransferCategory } from '../types/reqTypes';
import { IResCategorys, IResCreate, IResDelCategory, IResUpDownCategory } from '../types/resTypes';
import axiosServices from './axiosServices';
import { errorHandle } from './errorAxiosHandle';

const fetchCreateCategory1 = async (data: IReqCreateCategory): Promise<IResCreate> => {
  try {
    const res = await axiosServices.post<IResCreate>('/category/create', data);

    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchCreateSubCategory = async (data: IReqCreateSubCategory): Promise<IResCreate> => {
  try {
    const res = await axiosServices.post<IResCreate>(`/category/create/sub`, data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchEditCategory = async (data: IReqEditCategory): Promise<IResCreate> => {
  try {
    const res = await axiosServices.put<IResCreate>(`/category/edit`, data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchTranserCategory = async (data: TReqTransferCategory): Promise<IResCreate> => {
  try {
    const res = await axiosServices.put<IResCreate>(`/category/transfer`, data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchCategorys = async (): Promise<IResCategorys> => {
  try {
    const res = await axiosServices.get<IResCategorys>('/categorys');
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchDelCategory = async (data: TReqDelCategory): Promise<IResDelCategory> => {
  try {
    const res = await axiosServices.delete<IResDelCategory>(`/category/${data.categoryId}`, data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
}

const fetchDownCategory = async (data: IReqUpDownCategory): Promise<IResUpDownCategory> => {
  try {
    const res = await axiosServices.patch<IResUpDownCategory>('/category/down', data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
}

const fetchUpCategory = async (data: IReqUpDownCategory): Promise<IResUpDownCategory> => {
  try {
    const res = await axiosServices.patch<IResUpDownCategory>('/category/up', data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
}

export {
  fetchCreateCategory1,
  fetchCreateSubCategory,
  fetchCategorys,
  fetchEditCategory,
  fetchTranserCategory,
  fetchDelCategory,
  fetchDownCategory,
  fetchUpCategory
}