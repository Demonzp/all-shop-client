import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ICategory } from '../../store/slices/categorys';
import CategoryTransferItem from '../category-transfer-item';

type Props = {
  category: ICategory | undefined;
  isForce: boolean;
}

const CategoryTaransfer: React.FC<Props> = ({ category, isForce }) => {

  const { categorys } = useAppSelector(state => state.categorys);
  const [selectList, setSelectList] = useState<ICategory[]>([]);

  useEffect(() => {
    if (!category) {
      return;
    }
    setSelectList(() => {
      const arr = categorys.reduce((prev, c) => {
        if (c.nameTranslit !== category.nameTranslit) {
          return [...prev, c];
        } else {
          return [...prev];
        }
      }, [] as ICategory[]);

      return arr;
    });
  }, [category]);

  return (
    <ul>
      { isForce?
          selectList.map(c => {
            return (
              <CategoryTransferItem key={c.nameTranslit} category={c} />
            );
          })
        :
          null
      }
    </ul>
  )
};

export default CategoryTaransfer;