import React, { useEffect, useState } from 'react';
import { TObjKeyAnyString, TOnChangeInput } from '../types/global';

export type TReturn<T> = {errors?:TObjKeyAnyString, values:T}

//type TOnChange = (d:{name:string, value: string|number|boolean})=>void;

type TClearError = (d:string)=>void;

type THandleSubmit<T> = ()=> TReturn<T>;

type TValidation = (d: TObjKeyAnyString)=>TObjKeyAnyString;

const useSimpleForm = <T extends {}>({state, validation}:{
  state: T,
  validation: TValidation
}):{
  data: T,
  errors: TObjKeyAnyString,
  clearError: TClearError,
  onChange: TOnChangeInput,
  setErrors: React.Dispatch<React.SetStateAction<TObjKeyAnyString>>
  handleSubmit: THandleSubmit<T>
}=>{
  const [data, setData] = useState<T>(state);
  const [errors, setErrors] = useState<TObjKeyAnyString>({});

  useEffect(()=>{
    setData(state);
  }, [state]);

  const onChange:TOnChangeInput = ({name, value})=>{
    setData(prev=>{
        return {
          ...prev,
          [name]: value
        }
    });

    clearError(name as string);
  };

  const clearError:TClearError = (name)=>{
    setErrors(prev=>{
      const newErrors = {...prev};
      delete newErrors[name as string];
      return newErrors;
    })
  } 

  const handleSubmit:THandleSubmit<T> = ()=>{
    //console.log('data = ', data);
    const err = validation(data);
    setErrors(err);
    const resData:TReturn<T> = {values: data};
    if(Object.entries(err).length>0){
      resData['errors'] = err;
    }
    
    return resData;
  };

  return{
    data,
    errors,
    onChange,
    clearError,
    setErrors,
    handleSubmit
  };
};

export default useSimpleForm;