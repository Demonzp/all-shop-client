import { Route, Routes } from 'react-router-dom';
import Head from './components/head';
import Autorize from './pages/autorize';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import { ERoutes } from './types/routes';

const App = ()=>{
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