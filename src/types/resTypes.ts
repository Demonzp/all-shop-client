import { ICategory } from '../store/slices/categorys';

export interface IResBase {
  updatedToken: string | null;
}

export interface IResWhisToken extends IResBase {
  [name: string]: any;
}

export interface IResUser extends IResBase {
  user: unknown;
}

export interface IResCreate extends IResBase {
  category: ICategory;
}

export interface IResCategorys extends IResBase {
  categorys: ICategory[];
}

export interface IResDelCategory extends IResBase{
  category: string;
}

export type TResSuccess = {
  success: string;
}

export interface IResUpDownCategory extends IResBase {
  downCategory: ICategory | null;
  upCategory: ICategory | null;
}