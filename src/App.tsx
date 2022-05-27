import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Head from './components/head';
import useAuth from './hooks/useAuth';
import useMessageManager from './hooks/useMessageManager';
import Admin from './middlewares/Admin';
import NotAuth from './middlewares/NotAuth';
import Autorize from './pages/autorize';
import CategoryAdd from './pages/category-add';
import CategoryCreate from './pages/category-create';
import CategoryEdit from './pages/category-edit';
import { ENameParamsCatEdit } from './pages/category-edit/CategoryEdit';
import CategoryManager from './pages/category-manager';
import CreateProduct from './pages/create-product';
import CreateProductManager from './pages/create-product-manager';
import Home from './pages/home';
import ProductStructureTable from './pages/product-structur-table';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import { getLangGlobal } from './store/actions/lang';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ERoutes } from './types/routes';

const App = () => {
  const { lang } = useAppSelector(state => state.lang);
  const dispatch = useAppDispatch();
  useAuth();
  useMessageManager();

  useEffect(() => {
    dispatch(getLangGlobal(lang));
  }, [lang]);

  return (
    <div>
      <Head />
      <Routes>
        <Route path={ERoutes.HOME}>
          <Route index element={<Home />} />
          <Route
            path={ERoutes.ATORIZE}
            element={
              <NotAuth>
                <Autorize />
              </NotAuth>
            }
          >
            <Route path={ERoutes.SIGN_IN} element={<SignIn />} />
            <Route path={ERoutes.SIGN_UP} element={<SignUp />} />
          </Route>
          <Route path={ERoutes.CREATE_PRODUCT_MANAGER}>
            <Route index element={
              <Admin>
                <CreateProductManager />
              </Admin>
            }
            />
            <Route path=":nameTranslit" element={
              <Admin>
                <CreateProduct />
              </Admin>
            }
            />
          </Route>
          <Route path={ERoutes.CATEGORY_MANAGER}>
            <Route index element={
              <Admin>
                <CategoryManager />
              </Admin>
            }
            />
            <Route path={ERoutes.CREATE_CATEGORY} element={
              <Admin>
                <CategoryCreate />
              </Admin>
            }
            />
            <Route path={ERoutes.PRODUCT_STRUCTURE}>
              <Route index element={<Admin><div>Page Not found 404</div></Admin>} />
              <Route path=":categoryId" element={
                <Admin>
                  <ProductStructureTable />
                </Admin>
              }
              />
            </Route>
            <Route path={ERoutes.ADD_CATEGORY}>
              <Route index element={<Admin><div>Page Not found 404</div></Admin>} />
              <Route path=":id" element={
                <Admin>
                  <CategoryAdd />
                </Admin>
              }
              >
                <Route path=":id2" element={
                  <Admin>
                    <CategoryAdd />
                  </Admin>
                }
                />
              </Route>
            </Route>
            <Route path={ERoutes.EDIT_CATEGORY}>
              <Route index element={<Admin><div>Page Not found 404</div></Admin>} />
              <Route path={`:${ENameParamsCatEdit.ID}`} element={
                <Admin>
                  <CategoryEdit />
                </Admin>
              }
              >
                <Route path={`:${ENameParamsCatEdit.ID2}`} element={
                  <Admin>
                    <CategoryEdit />
                  </Admin>
                }
                />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<div>Page Not found 404</div>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;