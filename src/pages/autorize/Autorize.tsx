import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ERoutes } from '../../types/routes';

const Autorize = ()=>{
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!location.pathname.includes(ERoutes.SIGN_IN) && !location.pathname.includes(ERoutes.SIGN_UP)){
      navigate(ERoutes.SIGN_IN);
    }
    //console.log(location.pathname);
  }, [location]);

  return (
    <Outlet />
  );
};

export default Autorize;