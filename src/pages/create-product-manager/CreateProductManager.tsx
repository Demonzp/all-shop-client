import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LangText from '../../components/lang-text';
import LoadingBtn from '../../components/loading-btn';
import { getLangText } from '../../services/global';
import { getCategorys } from '../../store/actions/categorys';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ICategory } from '../../store/slices/categorys';
import { ELangs } from '../../types/langs';

const filterCategorys = (categorys: ICategory[]): ICategory[] => {
  let arr: ICategory[] = [];
  for (let i = 0; i < categorys.length; i++) {
    const c = categorys[i];
    if (c.tableProduct) {
      arr.push(c);
    }
    if (c.categorys.length > 0) {
      arr = arr.concat(filterCategorys(c.categorys));
    }
  }

  return arr;
}

const CreateProductManager = () => {
  const { langObj, lang } = useAppSelector(state => state.lang);
  const { categorys, isLoaded, isLoading } = useAppSelector(state => state.categorys);
  const [filteredCat, setFilteredCat] = useState<ICategory[]>([]);
  const [selectedCat, setSelectedCat] = useState<string | null>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      dispatch(getCategorys());
    }
  }, [isLoaded]);

  useEffect(() => {
    if (categorys.length > 0) {
      setFilteredCat(filterCategorys(categorys));
    }
  }, [categorys]);

  const onSubmit = () => {
    if (selectedCat) {
      navigate(selectedCat);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCat(e.target.id);
  }

  return (
    <div className='container'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{getLangText(langObj, 'title-create-category-for-product')}</h5>
          {
            filteredCat.map((category) => {
              return (
                <div key={category.nameTranslit} className="form-check" style={{marginTop:10}}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={category.nameTranslit}
                    onChange={onChange}
                  />
                  <label className="form-check-label" htmlFor={category.nameTranslit}>
                    {lang === ELangs.UA ? category.nameUA : category.nameRU}
                  </label>
                </div>
              );
            })
          }
          <div style={{ marginTop: 20 }}>
            <LoadingBtn
              isLoading={false}
              title={getLangText(langObj, 'select')}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductManager;