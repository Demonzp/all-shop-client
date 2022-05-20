import React, { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ICategory } from '../../store/slices/categorys';
import CategoryTransferItem from '../category-transfer-item';

type Props = {
  category: ICategory | undefined;
  isForce: boolean;
  setParent: (id: string | null) => void
}

const mainMenuCat: ICategory = {
  nameRU: 'на главное меню',
  nameUA: 'на головне меню',
  nameTranslit: 'null',
  categorys: [],
  zIndex: 1,
  tableProduct: null
}

const CategoryTaransfer: React.FC<Props> = ({ category, isForce, setParent }) => {

  const { categorys } = useAppSelector(state => state.categorys);
  const [selectList, setSelectList] = useState<ICategory[]>([]);

  useEffect(() => {
    if (!category) {
      return;
    }
    setSelectList(() => {
      const arr = categorys.reduce((prev, c) => {
        const parent = c.categorys.find(c2 => c2.nameTranslit === category.nameTranslit);
        let secondParent = -1;
        for (let i = 0; i < c.categorys.length; i++) {
          const c2 = c.categorys[i];
          secondParent = c2.categorys.findIndex(c3 => c3.nameTranslit === category.nameTranslit);
          if (secondParent >= 0) {
            break;
          }
        }
        if (c.nameTranslit !== category.nameTranslit && !parent) {
          let tempCat = { ...c };
          if (secondParent >= 0) {
            tempCat.categorys = [
              ...c.categorys.slice(0, secondParent),
              ...c.categorys.slice(secondParent + 1)
            ];
          }
          return [...prev, tempCat];
        } else {
          return [...prev];
        }
      }, [] as ICategory[]);

      return arr;
    });
  }, [category]);

  return (
    <ul>
      {isForce ?
        <Fragment>
          <CategoryTransferItem key='empty' category={mainMenuCat} setParent={() => { setParent(null) }} />
          {
            selectList.map(c => {
              return (
                <CategoryTransferItem key={c.nameTranslit} category={c} setParent={setParent} />
              );
            })
          }
        </Fragment>
        :
        null
      }
    </ul>
  )
};

export default CategoryTaransfer;