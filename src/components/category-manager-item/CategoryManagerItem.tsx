import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { ICategory } from '../../store/slices/categorys';
import { ELangs } from '../../types/langs';
import { ERoutes } from '../../types/routes';
import LangText from '../lang-text';

import './category-manager-item.css';

type Props = {
  category: ICategory;
  parent?: string;
}

const getUrl = (data: Props): string => {
  let url = data.parent ? data.parent + '/' + data.category.nameTranslit : data.category.nameTranslit;
  return url;
  //let url = `${ERoutes.ADD_CATEGORY}/${category.nameTranslit}`;
};

const CategoryManagerItem: React.FC<Props> = ({ category, parent }) => {
  const { lang } = useAppSelector(state => state.lang);
  const navigate = useNavigate();
  const collapseRef = useRef<HTMLDivElement>(null);

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col">
          <div
            onClick={() => collapseRef.current ? collapseRef.current.classList.toggle("show") : null}
            className="d-flex justify-content-between align-items-center btn cat-man-item-btn-list"
          >
            {lang===ELangs.UA?category.nameUA:category.nameRU}
            {
              category.categorys.length > 0 ?
                <div className="d-flex material-icons align-items-center">expand_more</div>
                :
                null
            }
          </div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-evenly">
            {
              getUrl({ category, parent }).split('/').length < 3 ?
                <div
                  className="btn btn-success"
                  onClick={() => navigate(`${ERoutes.ADD_CATEGORY}/${getUrl({ category, parent })}`)}
                >
                  <LangText k="btn-add-category" />
                </div>
                :
                null
            }
            <div className="btn btn-primary"><LangText k="btn-change-category" /></div>
            <div className="btn btn-danger"><LangText k="btn-del-category" /></div>
          </div>
        </div>
      </div>
      <div ref={collapseRef} className="collapse">
        <div className="row" style={{ paddingLeft: "30px" }}>
          <ul>
            {
              category.categorys.map(c => <CategoryManagerItem key={c.nameTranslit} category={c} parent={getUrl({ category, parent })} />)
            }
          </ul>
        </div>
      </div>
    </li>
  );
};

export default CategoryManagerItem;