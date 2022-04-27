import { useEffect } from 'react';
import axiosServices from '../services/axiosServices';
import { getUser } from '../store/actions/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setGuest } from '../store/slices/user';

const useAuth = ()=>{
  const {user, isAtempted} = useAppSelector(state=>state.user);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token && !user && !isAtempted){
      axiosServices.setAuth(token);
      dispatch(getUser())
        .unwrap()
        .catch(err=>{
          if(err.message==='expired token'){
            localStorage.removeItem('token');
            axiosServices.setGuest();
          }
        });
    }else{
      dispatch(setGuest());
    }
  }, []);
};

export default useAuth;