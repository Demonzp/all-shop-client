import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { downCategory, upCategory } from '../../store/actions/categorys';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ICategory } from '../../store/slices/categorys';
import { ELangs } from '../../types/langs';
import { ERoutes } from '../../types/routes';
import LangText from '../lang-text';

import './category-manager-item.css';

type TUrlProps = {
  category: ICategory;
  parent?: string;
}

type Props = {
  category: ICategory;
  onTransfer: (data: ICategory) => void;
  onDelete: (data: ICategory) => void;
  i:number;
  length: number;
  parent?: string;
}

const getUrl = (data: TUrlProps): string => {
  let url = data.parent ? data.parent + '/' + data.category.nameTranslit : data.category.nameTranslit;
  return url;
  //let url = `${ERoutes.ADD_CATEGORY}/${category.nameTranslit}`;
};

const CategoryManagerItem: React.FC<Props> = ({ category, parent, onTransfer, onDelete, i, length }) => {
  const { lang } = useAppSelector(state => state.lang);
  const navigate = useNavigate();
  const collapseRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col">
          <div
            onClick={() => collapseRef.current ? collapseRef.current.classList.toggle("show") : null}
            className="d-flex justify-content-between align-items-center btn cat-man-item-btn-list"
          >
            {lang === ELangs.UA ? category.nameUA : category.nameRU}
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
            <div style={{ maxWidth: 200 }}>
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
              <div
                className="btn btn-primary"
                onClick={() => navigate(`${ERoutes.EDIT_CATEGORY}/${getUrl({ category, parent })}`)}
              >
                <LangText k="btn-change-category" />
              </div>
              <div
                className="btn btn-primary"
                onClick={()=>dispatch(upCategory({nameTranslit:category.nameTranslit}))}
              >
                <LangText k="up" />
              </div>
              <div
                className="btn btn-primary"
                onClick={()=>dispatch(downCategory({nameTranslit:category.nameTranslit}))}
              >
                <LangText k="down" />
              </div>
              <div
                className="btn btn-primary"
                onClick={() => onTransfer(category)}
              >
                <LangText k="btn-move-category" />
              </div>
              {
                category.categorys.length===0?
                  <div
                    className="btn btn-primary"
                    onClick={() => navigate(`${ERoutes.PRODUCT_STRUCTURE}/${category.nameTranslit}`)}
                  >
                    <LangText k={category.tableProduct?"btn-edit-tableProduct":"btn-add-tableProduct"} />
                  </div>
                :
                  null
              }
              <div
                className="btn btn-danger"
                onClick={() => onDelete(category)}
              >
                <LangText k="btn-del-category" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={collapseRef} className="collapse">
        <div className="row" style={{ paddingLeft: "30px" }}>
          <ul>
            {
              category.categorys.map((c, i) => <CategoryManagerItem
                key={c.nameTranslit}
                i={i}
                length={category.categorys.length}
                category={c}
                parent={getUrl({ category, parent })}
                onTransfer={onTransfer}
                onDelete={onDelete}
              />
              )
            }
          </ul>
        </div>
      </div>
    </li>
  );
};

export default CategoryManagerItem;