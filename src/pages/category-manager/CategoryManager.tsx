import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CategoryManagerItem from '../../components/category-manager-item';
import LangText from '../../components/lang-text';
import { getCategorys } from '../../store/actions/categorys';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
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

const CategoryManager = () => {
  const {categorys} = useAppSelector(state=>state.categorys);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getCategorys());
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="col cat-manager-cont">
        <div className="cat-manager-list-cont">
          <ul className="list-group">
          {
            categorys.map(category=>{
              return (
                <CategoryManagerItem 
                  key={category.nameTranslit} 
                  category={category}
                />
              );
            })
          }
          </ul>
        </div>
        <div className="btn-cont-link" style={{maxWidth:200}}>
          <NavLink to={ERoutes.CREATE_CATEGORY} className="btn-primery-link">
            <LangText k="btn-create-category" />
          </NavLink>
        </div>
      </div>
      {/* <Outlet /> */}
    </div>
  );
};

export default CategoryManager;