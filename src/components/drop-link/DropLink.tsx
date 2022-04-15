import React, { Fragment, useRef } from 'react';
import { TNavData } from '../head/Head';
import NavLinkSwitch from '../nav-link-switch';

type Props = {
  navData: TNavData;
}

const DropLink:React.FC<Props> = ({navData}) => {
  const collapseRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      <div
        className="d-flex align-items-center justify-content-between btn-link-list"
        onClick={() => collapseRef.current ? collapseRef.current.classList.toggle("show") : null}
      >
        {navData.title}
        <div className="d-flex material-icons align-items-center">expand_more</div>
      </div>
      <div ref={collapseRef} className="collapse">
        <div className="row" style={{paddingLeft:"30px"}}>
          {
            navData.children.map(l=><NavLinkSwitch key={l.title} navData={l}/>)
          }
        </div>
      </div>
    </Fragment>
  );
};

export default DropLink;