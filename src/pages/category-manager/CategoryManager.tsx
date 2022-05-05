import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AlertManager from '../../components/alert-manager';
import CategoryManagerItem from '../../components/category-manager-item';
import CategoryTaransfer from '../../components/category-transfer';
import CustomColInput from '../../components/custom-col-input';
import CustomModal from '../../components/custom-modal';
import CustomModalBody from '../../components/custom-modal-body';
import CustomModalFooter from '../../components/custom-modal-footer';
import LangText from '../../components/lang-text';
import LoadingBtn from '../../components/loading-btn';
import { getLangText } from '../../services/global';
import { deleteCategory, getCategorys, transferCategory } from '../../store/actions/categorys';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ICategory } from '../../store/slices/categorys';
import { EColors } from '../../types/colors';
import { ELangs } from '../../types/langs';
import { ERoutes } from '../../types/routes';

import './category-manager.css';

// const categorys = {
//   id:'1212',
//   name:'Продукты питания',
//   tableProducts: null,
// };

// const categorys2 = {
//   id: '123',
//   name: 'Безалкогольные напитки',
//   category: '1212',
//   tableProducts:null
// };

// const category3 = {
//   id: '21344',
//   name: 'Минералки',
//   category: '123',
//   tableProducts:'транскрипция name',
//   defaultStruct:{
//     'id': bigint,
//     'keyId': bigint,
//     'imgMain': srting,
//     'imgs': string [],
//     'price': number,
//     'amount': number,
//     'isUniq': 'boolean'
//   },
//   Structure:{
//     'dawdawd': whisDefault,
//     'dfsaefgr': whisDefault,
//     'dsrgbdr': string,
//     'fawefga': whisDefault,
//     'dawdaw55': whisDefault,
//     'fagfaer': whisDefault
//   },
//   ruStructur: {
//     'dawdwa': 'id',
//     'dawdawd':'обьем',
//     'dfsaefgr':'торговая марка',
//     'dawdaw55': 'тип', 
//     'nfafre':'тип газування',
//     'fagfaer':'со вкусом',
//     'dsrgbdr':'страна',
//     'fawefga': 'тип упаковки',
//     'imgMain':'Главная картинка',
//     'imgs': 'Картинки',
//     'price': 'Цена',
//     'amount': 'Количество товара',
//     'isUniq': 'С уникальным идентификатором'
//   },
//   defaultVals: {
//     'dawdawd':[0.33,0.5,0.75,1,2,3,5],
//     'fawefga':{
//       'ru': ['Pet', 'Стекло'],
//       'ua': ['Pet', 'скло']
//     },
//     'dawdaw55':['stolovaya','Лечебно столовая'],
//     'fagfaer':['без газа', 'с газом', 'сильно газированая']
//   },
//   filterFields: ['dawdawd', 'dfsaefgr', 'dsrgbdr', 'fawefga']
// }

// const dwadawd = {
//   id: '213',
//   capacity: 2,
//   traidMark: 'Marsha',
//   country: 'UA',
//   grade: 'столовая',
//   typePack: 'PET',
//   imgMain: '',
//   imgs:['','',''],
//   price: 20,
//   amount: 200,
//   isUniq: false
// }

// const category4 = {

// }

const getNameCat = (lang: string, category: ICategory | undefined): string => {
  if (category) {
    if (lang === ELangs.RU) {
      return category.nameRU;
    } else {
      return category.nameUA;
    }
  } else {
    return '';
  }
};

const CategoryManager = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const toggle = () => setShow(prev => !prev);
  const toggleForce = (data: boolean) => setShow(data);
  const toggle2 = () => setShow2(prev => !prev);
  const toggleForce2 = (data: boolean) => setShow2(data);
  const [categorySelect, setCategorySelect] = useState<ICategory>();
  const [parentId, setParentId] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const { categorys, isLoading, errorsValid, errorMessage } = useAppSelector(state => state.categorys);
  const { langObj, lang } = useAppSelector(state => state.lang);
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategorys());
  }, []);

  useEffect(()=>{
    console.log(isLoading,'|',errorMessage);
  }, [isLoading, errorMessage]);

  const beginTransfer = (c: ICategory) => {
    toggle();
    setCategorySelect(c);
  };

  const setParent = (id: string | null) => {
    setParentId(id);
    setIsSelected(true);
    //console.log('id = ', id);
  };

  const onSubmit = () => {
    if (categorySelect && isSelected) {
      dispatch(transferCategory({
        categoryId: categorySelect.nameTranslit,
        parentId
      }))
        .unwrap()
        .then(() => toggleForce(false));
    }
  };

  const beginDelete = (c: ICategory) => {
    toggle2();
    setCategorySelect(c);
  };

  const onDel = () => {
    if (categorySelect) {
      dispatch(deleteCategory({
        categoryId: categorySelect.nameTranslit,
        password
      }))
        .unwrap()
        .then(() => toggleForce2(false));
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <CustomModal
        show={show}
        toggleForce={toggleForce}
        title={`${getLangText(langObj, 'title-transfer-cat')} "${getNameCat(lang, categorySelect)}"`}
      >
        <CustomModalBody>
          <CategoryTaransfer category={categorySelect} isForce={show} setParent={setParent} />
        </CustomModalBody>
        <CustomModalFooter>
          <LoadingBtn
            title={getLangText(langObj, 'transfer')}
            isLoading={isLoading}
            onClick={onSubmit}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggle}
          >
            <LangText k="cancel" />
          </button>
        </CustomModalFooter>
      </CustomModal>
      <CustomModal
        show={show2}
        toggleForce={toggleForce2}
        title={`${getLangText(langObj, 'title-del-cat')} "${getNameCat(lang, categorySelect)}"?`}
      >
        <CustomModalBody>
          <p><LangText k="text-del-cat" /></p>
          <p><LangText k="sub-text-del-cat" /></p>
          <p><LangText k="confirm-del-cat" /></p>
          <AlertManager
            errorMessage={errorMessage}
          />
          <CustomColInput
            type="password"
            name="password"
            data={{ password }}
            errors={errorsValid}
            onChange={(data) => setPassword(data.value)}
            label={getLangText(langObj, "password")}
          />
        </CustomModalBody>
        <CustomModalFooter>
          <LoadingBtn
            title={getLangText(langObj, 'title-del-cat')}
            isLoading={isLoading}
            onClick={onDel}
            type={EColors.DANGER}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggle2}
          >
            <LangText k="cancel" />
          </button>
        </CustomModalFooter>
      </CustomModal>
      <div className="col cat-manager-cont">
        <div className="cat-manager-list-cont">
          <ul className="list-group">
            {
              categorys.map(category => {
                return (
                  <CategoryManagerItem
                    key={category.nameTranslit}
                    category={category}
                    onTransfer={beginTransfer}
                    onDelete={beginDelete}
                  />
                );
              })
            }
          </ul>
        </div>
        <div className="btn-cont-link" style={{ maxWidth: 200 }}>
          <NavLink to={ERoutes.CREATE_CATEGORY} className="btn-primary-link">
            <LangText k="btn-create-category" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;