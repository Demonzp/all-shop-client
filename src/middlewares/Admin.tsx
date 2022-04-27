import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { ERoles } from '../store/slices/user';
import { ERoutes } from '../types/routes';

type Props = {
  children: JSX.Element
}

const Admin: React.FC<Props> = ({children})=>{
  const {user, isLoading} = useAppSelector(state=>state.user);
  let location = useLocation();

  if(isLoading){
    return <div>Loading...</div>;
  }

  if (!user || user.role!==ERoles.ADMIN) {
    return <Navigate to={ERoutes.HOME} state={{ from: location }} replace />;
  }

  return children;
};

export default Admin;