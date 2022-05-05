import { Fragment, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ERoutes } from '../../types/routes';
import MiddlewareLink from '../middelware-link/MiddlewareLink';
import NavLinkSwitch from '../nav-link-switch';
import './head.css';

import { getOptionsFromEnum } from '../../services/global';
import { ELangs } from '../../types/langs';
import { setLang } from '../../store/slices/lang';
import LangText from '../lang-text';
import { ERoles } from '../../store/slices/user';

export type TNavData = {
  title: string;
  to: string;
  children: TNavData[];
  isAdmin?: boolean;
}

const navList: TNavData[] = [
  {
    title: 'naw1',
    to: 'link1',
    children: []
  },
  {
    title: 'naw2',
    to: 'link2',
    children: [
      {
        title: 'naw2-1',
        to: 'link2-1',
        children: [
          {
            title: 'naw2-1-1',
            to: 'link2-1-1',
            children: []
          },
          {
            title: 'naw2-1dawdaw fawef arg ergaer-2',
            to: 'link2-1-2',
            children: []
          },
          {
            title: 'naw2-1-3',
            to: 'link2-1-3',
            children: []
          },
        ]
      },
      {
        title: 'naw2-2',
        to: 'link2-2',
        children: []
      }
    ]
  },
  {
    title: 'naw3',
    to: 'link3',
    children: []
  },
];

const navListAdmin: TNavData[] = [
  {
    title: 'AdminPanel',
    to: '/admin',
    children: [
      {
        title: 'Category Manager',
        to: '/category-manager',
        children:[]
      }
    ]
  }
];

const Head = () => {

  const location = useLocation();
  const { lang } = useAppSelector(state => state.lang);

  const { user } = useAppSelector(state => state.user);

  const offcanvasRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offcanvasRef.current) {
      offcanvasRef.current?.click();
    }
  }, [location]);

  return (
    <Fragment>
      <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">All-Shop</h5>
          <button ref={offcanvasRef} type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="list-group">
            {
              !user?
                <NavLinkSwitch navData={{ to: ERoutes.ATORIZE, title: 'авторизация', children: [] }} />
                :
                null
            }
            {
              user?
                user.role===ERoles.ADMIN?
                <Fragment>
                  {navListAdmin.map(l=><NavLinkSwitch key={l.title} navData={l}/>)}
                </Fragment>
                :
                null
              :
              null
            }
            {
              navList.map(l => {
                return <NavLinkSwitch key={l.title} navData={l} />
              })
            }
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light head-bg shadow p-3 mb-5">
        <div className="container-fluid">
          <button className="head-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" col d-flex justify-content-end head-cont">
            <div className="d-flex justify-content-start head-cont">
              <MiddlewareLink to={ERoutes.HOME} className="navbar-brand">
                All-Shop
              </MiddlewareLink>
            </div>

            <div className="d-flex">
              <div
                className="d-flex material-icons align-items-center head-ico custom-btn ml-5"
                data-bs-toggle="collapse"
                data-bs-target="#collapseWidthExample"
                aria-expanded="false"
                aria-controls="collapseWidthExample"
              >
                search
              </div>
              <div className="head-cont-shop-card custom-btn ml-5">
                <div
                  className="d-flex material-icons align-items-center head-ico"
                >
                  shopping_cart
                </div>
                <span className="badge bg-primary shop-cart rounded-pill">14</span>
              </div>
              {
                !user ?
                  <div className="d-sm-none d-md-block d-none d-sm-block ml-5 mr-5">
                    <div className="btn-cont-link">
                      <NavLink to={ERoutes.ATORIZE} className="btn-primary-link">
                        <LangText k="authorization" />
                      </NavLink>
                    </div>
                  </div>

                  :
                  null
              }

            </div>
            <div>
              <select
                className="form-select form-select-sm m-bg-pink-light mr-5"
                aria-label="form-select-sm example"
                value={lang}
                onChange={(e) => dispatch(setLang(e.target.value as ELangs))}
              >
                {
                  getOptionsFromEnum(ELangs).map(l => {
                    return <option key={l.value} value={l.value}>{l.label}</option>
                  })
                }
              </select>
            </div>

          </div>

          <div className="row head-cont-search">
            <div className="collapse" id="collapseWidthExample">
              <input className="form-control form-control-lg" type="text" placeholder="search" aria-label=".form-control-lg example" />
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Head;