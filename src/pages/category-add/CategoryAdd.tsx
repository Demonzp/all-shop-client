import { useNavigate, useParams } from 'react-router-dom';
import FormCategory from '../../components/form-category';
import { TFormCategory } from '../../components/form-category/FormCategory';
import { TReturn } from '../../hooks/useSimpleForm';
import { createSubCategory } from '../../store/actions/categorys';
import { useAppDispatch } from '../../store/hooks';

const state:TFormCategory = {
  nameRU: '',
  nameUA: '',
  translit: '',
  defaultTranslit: ''
}

const CategoryAdd = ()=>{
  const {id, id2} = useParams<{id:string,id2:string}>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: TReturn<TFormCategory>)=>{
    let categoryId = id;
    if(id2){
      categoryId = id2;
    }
    if(!data.errors && categoryId){

      dispatch(createSubCategory({
        ...data.values,
        categoryId
      }))
        .unwrap()
        .then(()=>{
          let path = '../../';
          navigate(path);
        });
    }
  };

  return(<FormCategory state={state} onSubmit={onSubmit} title="form-create-category" btnTitle="btn-create-category"/>);
};

export default CategoryAdd;