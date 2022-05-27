import { ESex } from './sex';
import { IStructureFieldProduct } from './structureProduct';

export interface IReqCreateCategory {
  nameUA: string;
  translit: string;
  nameRU: string;
}

export interface IReqUpDownCategory{
  nameTranslit: string;
}

export interface IReqCreateSubCategory extends IReqCreateCategory {
  categoryId: string;
}

export interface IReqEditCategory extends IReqCreateCategory {
  categoryId: string;
}

export type TReqTransferCategory = {
  categoryId: string;
  parentId: string | null;
}

export type TReqDelCategory = {
  categoryId: string;
  password: string;
}

export type TReqUserReg = {
  email: string;
  firstName: string;
  secondName: string;
  phoneNumber: string;
  sex: ESex;
  birthday: number;
  password: string;
}

export type TReqUserSignin = {
  login: string;
  password: string;
}

export interface TReqTableStructure extends IReqUpDownCategory{
  fields: IStructureFieldProduct [];
  characteristics: IStructureFieldProduct [];
}

export interface TReqEditAddTableStructure extends IReqUpDownCategory{
  field: IStructureFieldProduct;
}

export interface TReqDelFieldTableStructure extends IReqUpDownCategory{
  id: number;
}