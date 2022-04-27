import axios, { AxiosInstance, AxiosResponse } from 'axios';

class AxiosServices{

  axios: AxiosInstance;
  private static instance: AxiosServices;

  constructor(){
    this.axios = axios.create();
  }

  static getInstance() {
    if (AxiosServices.instance) {
      return this.instance;
    }
    this.instance = new AxiosServices();
    return this.instance;
  }

  setAuth(token:string):void{
    this.axios = axios.create({
      headers:{
        Authorization: token
      }
    });
  }

  setGuest():void{
    this.axios = axios.create();
  }

  async get<T>(path:string, params?:any):Promise<AxiosResponse<T>>{
    return await this.axios.get<T>(path, {
      params
    });
  }

  async post<T>(path:string, data:any):Promise<AxiosResponse<T>>{
    return await this.axios.post<T>(path, data);
  }

}

const axiosServices = AxiosServices.getInstance();

export default axiosServices;