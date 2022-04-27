import { useNavigate } from 'react-router-dom';
import FormCategory from '../../components/form-category';
import { TFormCategory } from '../../components/form-category/FormCategory';
import { TReturn } from '../../hooks/useSimpleForm';
import { createCategory } from '../../store/actions/categorys';
import { useAppDispatch } from '../../store/hooks';
import { ERoutes } from '../../types/routes';

const state:TFormCategory = {
  nameUA:'', 
  nameRU:'', 
  translit:'', 
  defaultTranslit:''
}

const CategoryCreate = ()=>{
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (vals:TReturn<TFormCategory>)=>{
    console.log('vals = ', vals);
    if(!vals.errors){
      dispatch(createCategory(vals.values))
      .unwrap()
      .then(()=>navigate('../'));
    }
  };

  return(
    <FormCategory state={state} onSubmit={onSubmit}/>
  );
};

export default CategoryCreate;