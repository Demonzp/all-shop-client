import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertManager from '../../components/alert-manager';
import CustomColInput from '../../components/custom-col-input';
import CustomColTextarea from '../../components/custom-col-textarea';
import CustomImgPick from '../../components/custom-img-pick';
import { IFileData } from '../../components/custom-img-pick/CustomImgPick';
import LoadingBtn from '../../components/loading-btn';
import { getLangText } from '../../services/global';
import { getCategorys } from '../../store/actions/categorys';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { findCategory } from '../../store/slices/categorys';
import { TObjKeyAny, TOnChangeInput } from '../../types/global';
import { ELangs } from '../../types/langs';
import { EFieldsTypes, IStructureFieldProduct } from '../../types/structureProduct';

const CreateProduct = () => {
  const { nameTranslit } = useParams<{ nameTranslit: string }>();
  const [structure, setStructure] = useState<TObjKeyAny>({});
  const [isReady, setIsReady] = useState(false);
  const { isLoaded, category, isLoading, errorMessage } = useAppSelector(state => state.categorys);
  const { langObj, lang } = useAppSelector(state => state.lang);
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<IFileData[]>([]);

  useEffect(() => {
    if (nameTranslit) {
      if (!isLoaded) {
        dispatch(getCategorys());
      } else {
        dispatch(findCategory(nameTranslit));
      }
      //console.log('nameTranslit = ', nameTranslit);
    }
  }, [nameTranslit, isLoaded]);

  useEffect(() => {
    if (!isLoading && category) {
      setIsReady(true);
      return;
    }
    setIsReady(false);

  }, [isLoading, category]);

  const onChange:TOnChangeInput = ({name, value})=>{
    setStructure(prev=>{
      return {
        ...prev,
        [name]: value
      }
    });
  };

  const getName = (field: {nameUA: string, nameRU: string})=>{
    return lang === ELangs.UA ? field.nameUA : field.nameRU;
  }

  const onChangePickImg = (f:IFileData[])=>{
    setFiles(prev=>{
      const uniq = [...prev];

      f.forEach(newFile=>{
        const findFile = prev.find(file=>newFile.id===file.id);
        if(!findFile){
          uniq.push(newFile);
        }
      });

      return uniq;
    });
  };

  useEffect(()=>{
    console.log('files = ', files);
  }, [files])

  const getField = (field: IStructureFieldProduct): JSX.Element | null => {
    if (field.id === 'stock') {
      return null;
    }
    switch (field.type) {
      case EFieldsTypes.STRING:
        if(Number(field.length)>=80){
          return(
            <CustomColTextarea 
              key={field.id}
              name={field.id}
              label={getName(field)} 
              data={structure} 
              onChange={onChange}
            />
          );
        }else{
          return (
            <CustomColInput
              key={field.id}
              name={field.id}
              label={getName(field)}
              data={structure}
              onChange={onChange}
            />
          );
        }
      case EFieldsTypes.WITH_DEFAULT:
        if (!field.isMult) {
          return (
            <div key={field.id} className="row mb-3 p-t-20">
              <label className="col-sm-2 col-form-label">{getName(field)}</label>
              <div className="col-sm-5">
                <select
                  className="form-select form-select-sm"
                  aria-label="form-select-sm example"
                  value={structure[field.id]}
                  onChange={(e)=>{onChange({name:field.id, value: e.target.value})}}
                >
                  <option value="none">{getName({nameRU:'выберите', nameUA:'оберіть'})}</option>
                  {
                    field.defaults.map(el=>{
                      return <option key={el.id} value={el.id}>{getName(el)}</option>
                    })
                  }
                </select>
              </div>
            </div>
          );
        } else {
          return null;
        }
      case EFieldsTypes.NUMBER:
        return (
          <CustomColInput
            key={field.id}
            name={field.id}
            type='number'
            label={getName(field)}
            data={structure}
            onChange={onChange}
          />
        );
      case EFieldsTypes.DATE:
        if(field.id==='createdAt'||field.id==='updatedAt'){
          return null;
        }
        return(
          <CustomColInput
            key={field.id}
            name={field.id}
            type='date'
            label={getName(field)}
            data={structure}
            onChange={onChange}
          />
        );
      case EFieldsTypes.FILE:
        if(field.id==='mainFoto'){
          return (
            <CustomImgPick
              key={field.id}
              name={field.id}
              label={getName(field)}
              onChangePickImg={onChangePickImg}
            />
          );
        }else{
          return (
            <CustomImgPick
              key={field.id}
              name={field.id}
              label={getName(field)}
              onChangePickImg={onChangePickImg}
              multiple
            />
          );
        }

      default:
        return null;
    }
  };

  const onSubmit = ()=>{
    console.log(structure);
  };

  return (
    <div className="container">
      <AlertManager errorMessage={errorMessage} />
      {isReady ?
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{`${getLangText(langObj, 'title-add-product')} "${lang === ELangs.UA ? category!.nameUA : category!.nameRU}"`}</h5>
            {
              category?.tableProduct?.fields.map(f => {
                return getField(f);
              })
            }
            {
              category?.tableProduct?.characteristics.map(f => {
                return getField(f);
              })
            }
          </div>
          <div>
            <LoadingBtn 
              isLoading={false} 
              title={getLangText(langObj, 'add-product')} 
              onClick={onSubmit}
            />
          </div>
        </div>
        :
        <div>Loading...</div>
      }
    </div>
  );
};

export default CreateProduct;