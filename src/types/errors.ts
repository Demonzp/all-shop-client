export interface ICustomError {
  errorName: ETypeCustomErrors,
  message: string,
}

export interface ICustomValidationError{
  message: string;
  field: string | number;
}

export interface IStructurValidationError extends ICustomValidationError{
  rowId: string;
}

export type TAppValidateError = {[name:string]:{message:string}};

export enum ETypeCustomErrors {
  VALID_ERROR = 'ValidError',
  CUSTOM_ERROR = 'CustomError'
}

export interface IRejectWithValue {
  errorName: ETypeCustomErrors
}

export interface IRejectWithValueError extends IRejectWithValue{
  message: string
}

export interface IRejectWithValueValid extends IRejectWithValue{
  errors: ICustomValidationError[]
}