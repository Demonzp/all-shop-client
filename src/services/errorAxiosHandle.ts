import { AxiosError } from 'axios';
import CustomValidationError from './customValidationError';

export const errorHandle = <T>(error: AxiosError) => {

  if (error.response) {
    console.log(error.response.status);
    if(Number(error.response.status)===412){
      throw new CustomValidationError<T>(error.response.data.error);
    }else{
      console.log('err = ', error.message);
      console.log('err data = ', error.response.data);
      if(error.response.data.error){
        //console.log('err = ', error.response.data);
        throw new Error(error.response.data.error);
      }else{
        throw error;
      }
    }
    
  }
  //console.log('err = ', error.message);
  throw error;
}