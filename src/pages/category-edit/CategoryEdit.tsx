import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormCategory from '../../components/form-category';
import { TFormCategory } from '../../components/form-category/FormCategory';
import { TReturn } from '../../hooks/useSimpleForm';
import { editCategory } from '../../store/actions/categorys';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export enum ENameParamsCatEdit {
  ID = 'id',
  ID2 = 'id2',
  ID3 = 'id3'
}

type Params = {
  [ENameParamsCatEdit.ID]: string,
  [ENameParamsCatEdit.ID2]: string,
  [ENameParamsCatEdit.ID3]: string
}

const CategoryEdit = () => {
  const { id, id2, id3 } = useParams<Params>();
  const {categorys} = useAppSelector(state=>state.categorys);
  const [currentCategory, setCurrentCategory] = useState<TFormCategory>();
  const [categoryId, setCategoryId] = useState<string>();
  const [returnPath, setReturnPath] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let category = null;
    if(id3){
      category = categorys.find(c=>c.nameTranslit===id)?.categorys.find(c=>c.nameTranslit===id2)?.categorys.find(c=>c.nameTranslit===id3);
      if(category){
        setCurrentCategory({
          nameRU: category.nameRU,
          nameUA: category.nameUA,
          translit: '',
          defaultTranslit: category.nameTranslit
        });
        setReturnPath('../../');
        setCategoryId(category.nameTranslit);
      }
      
      return;
    }
    if(id2){
      category = categorys.find(c=>c.nameTranslit===id)?.categorys.find(c=>c.nameTranslit===id2);
      if(category){
        setCurrentCategory({
          nameRU: category.nameRU,
          nameUA: category.nameUA,
          translit: '',
          defaultTranslit: category.nameTranslit
        });
        setReturnPath('../');
        setCategoryId(category.nameTranslit);
      }
      return;
    }
    if(id){
      category = categorys.find(c=>c.nameTranslit===id);
      if(category){
        setCurrentCategory({
          nameRU: category.nameRU,
          nameUA: category.nameUA,
          translit: '',
          defaultTranslit: category.nameTranslit
        });
        setReturnPath('../');
        setCategoryId(category.nameTranslit);
      }
      return;
    }
  }, [id, id2, id3]);

  const onSubmit = (vals:TReturn<TFormCategory>)=>{
    //console.log('vals = ', vals);
    if(!vals.errors && categoryId){
      dispatch(editCategory({...vals.values, categoryId}))
        .unwrap()
        .then(()=>navigate(`../${returnPath}`));
    }
  };

  return(
    <Fragment>
      {
        currentCategory?
          <FormCategory 
            state={currentCategory}
            onSubmit={onSubmit}
            title="form-edit-category"
            btnTitle="btn-change-category"
          />
          :
          null
      }
    </Fragment>
  );

};

export default CategoryEdit;