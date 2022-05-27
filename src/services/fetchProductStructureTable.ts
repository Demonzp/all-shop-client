import { AxiosError } from 'axios';
import { TReqDelFieldTableStructure, TReqEditAddTableStructure, TReqTableStructure } from '../types/reqTypes';
import { IResWhisToken } from '../types/resTypes';
import axiosServices from './axiosServices';
import { errorHandle } from './errorAxiosHandle';

const fetchCreateProductStructureTable = async (data: TReqTableStructure):Promise<any>=>{
  try {
    const res = await axiosServices.post('/category/table-products', data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchAddProductStructureTable = async (data: TReqEditAddTableStructure):Promise<IResWhisToken>=>{
  try {
    const res = await axiosServices.put<IResWhisToken>('/category/table-products', data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchEditProductStructureTable = async (data: TReqEditAddTableStructure):Promise<IResWhisToken>=>{
  try {
    const res = await axiosServices.patch<IResWhisToken>('/category/table-products', data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

const fetchDelProductStructureTable = async (data: TReqDelFieldTableStructure):Promise<IResWhisToken>=>{
  try {
    const res = await axiosServices.delete<IResWhisToken>(`/category/table-products/${data.id}`, {nameTranslit:data.nameTranslit});
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export {
  fetchCreateProductStructureTable,
  fetchAddProductStructureTable,
  fetchEditProductStructureTable,
  fetchDelProductStructureTable
}