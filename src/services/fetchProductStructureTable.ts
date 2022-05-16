import { AxiosError } from 'axios';
import { TReqTableStructure } from '../types/reqTypes';
import axiosServices from './axiosServices';
import { errorHandle } from './errorAxiosHandle';

const fetchAddProductStructureTable = async (data: TReqTableStructure):Promise<any>=>{
  try {
    const res = await axiosServices.post('/category/table-products', data);
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export {
  fetchAddProductStructureTable
}