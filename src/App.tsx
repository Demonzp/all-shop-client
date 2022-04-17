import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Head from './components/head';
import useMessageManager from './hooks/useMessageManager';
import Autorize from './pages/autorize';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import { getLangGlobal } from './store/actions/lang';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ERoutes } from './types/routes';

const App = ()=>{
  const {lang} = useAppSelector(state=>state.lang);
  const dispatch = useAppDispatch();
  useMessageManager();

  useEffect(()=>{
    dispatch(getLangGlobal(lang));
  }, [lang]);
  
  return (
    <div>
      <Head />
      <Routes>
        <Route path={ERoutes.HOME}>
          <Route index element={<Home />}/>
          <Route path={ERoutes.ATORIZE} element={<Autorize />}>
            <Route path={ERoutes.SIGN_IN} element={<SignIn />} />
            <Route path={ERoutes.SIGN_UP} element={<SignUp />} />
          </Route>
          <Route path="*" element={<div>Page Not found 404</div>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;