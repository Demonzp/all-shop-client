import { useEffect, useState } from 'react';
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
  const [path, setPath] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    //console.log(id,'||',id2);
    let strPath = `/${id}`;
    if(id2){
      strPath+=`/${id2}`;
    }

    setPath(strPath);
  }, [id, id2]);

  const onSubmit = (data: TReturn<TFormCategory>)=>{
    if(!data.errors && id){
      dispatch(createSubCategory({
        ...data.values,
        path
      }))
        .unwrap()
        .then(()=>{
          let path = '../../';
          navigate(path);
        });
    }
  };

  return(<FormCategory state={state} onSubmit={onSubmit}/>);
};

export default CategoryAdd;