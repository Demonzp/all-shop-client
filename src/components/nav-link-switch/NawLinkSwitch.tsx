import React from 'react';
import { NavLink } from 'react-router-dom';
import DropLink from '../drop-link';
import { TNavData } from '../head/Head';
import MiddlewareLink from '../middelware-link/MiddlewareLink';

type Props = {
  navData: TNavData;
}

const getNavClass: (isActive: boolean) => string | undefined = (isActive) => {
  let className = 'btn-link-list';

  if (isActive) {
    className += ' btn-link-active shadow';
  }
  return className;
};

const NavLinkSwitch: React.FC<Props> = ({ navData }) => {
  if (navData.children.length > 0) {
    return <DropLink navData={navData} />
  } else {
    return (
      // <NavLink
      //   to={navData.to}
      //   className={({ isActive }) => getNavClass(isActive)}
      // >
      //   <div className="d-flex align-items-center" style={{minHeight:"50px"}}>
      //     {navData.title}
      //   </div>
      // </NavLink>
      <MiddlewareLink to={navData.to} className={({ isActive }) => getNavClass(isActive)}>
        <div className="d-flex align-items-center" style={{ minHeight: "50px" }}>
          {navData.title}
        </div>
      </MiddlewareLink>
    );
  }
};

export default NavLinkSwitch;