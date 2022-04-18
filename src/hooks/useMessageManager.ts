import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearAllMessage, setIsReadMessage } from '../store/slices/user';

const useMessageManager = () => {
  const { isReadMessage } = useAppSelector(state=>state.user);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(!isReadMessage){
      dispatch(setIsReadMessage(true));
    }else{
      dispatch(clearAllMessage());
    }
  }, [location]);
};

export default useMessageManager;