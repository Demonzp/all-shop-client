import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ICategory } from '../../store/slices/categorys';
import { ELangs } from '../../types/langs';

type Props = {
  category: ICategory;
  setParent: (id: string)=>void
}

const CategoryTransferItem:React.FC<Props> = ({category, setParent}) => {
  const collapseRef = useRef<HTMLDivElement>(null);
  const { lang } = useAppSelector(state => state.lang);


  const onRadio = (id: string)=>{
    setParent(id);
  };

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-2">
          <input 
            name="slectCategory" 
            className="form-check-input" 
            type="radio" 
            onChange={(e)=>e.target.checked?onRadio(category.nameTranslit):null}
          />
        </div>
        <div className="col-8">
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
      </div>
      <div ref={collapseRef} className="collapse">
        <ul style={{ paddingLeft: "30px" }}>

          {
            category.categorys.map(c2 => {
              return (
                <li key={c2.nameTranslit} className="list-group-item">
                  <div className="row">
                    <div className="col-2">
                      <input
                        name="slectCategory"
                        className="form-check-input"
                        type="radio"
                        onChange={(e)=>e.target.checked?onRadio(c2.nameTranslit):null}
                      />
                    </div>
                    <div className="col-8">
                      <div>
                        {lang === ELangs.UA ? c2.nameUA : c2.nameRU}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </li>
  );
};

export default CategoryTransferItem;