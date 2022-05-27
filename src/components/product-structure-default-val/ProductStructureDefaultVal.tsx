import React, { Fragment, useState } from 'react';
import { createId, getLangText } from '../../services/global';
import { useAppSelector } from '../../store/hooks';
import { EColors } from '../../types/colors';
import { TObjKeyAny, TOnChangeInput } from '../../types/global';
import { ELangs } from '../../types/langs';
import { EFieldsTypes, IBaseStructureField } from '../../types/structureProduct';
import CustomColInput from '../custom-col-input';
import CustomModal from '../custom-modal';
import CustomModalBody from '../custom-modal-body';
import CustomModalFooter from '../custom-modal-footer';
import LoadingBtn from '../loading-btn';

type Props = {
  type: EFieldsTypes;
  defaults: IBaseStructureField[];
  addDefaultValue: (data: IBaseStructureField)=>void;
  delDefault: (data: string)=>void;
  editDefaultValue: (data: IBaseStructureField)=>void;
}

const getInitField = ():IBaseStructureField => {
  return {
    id: createId(6),
    nameRU:'',
    nameUA:''
  }
};

const ProductStructureDefaultVal:React.FC<Props> = ({
  type, 
  defaults, 
  addDefaultValue,
  delDefault,
  editDefaultValue
})=>{
  const {langObj, lang} = useAppSelector(state=>state.lang);
  const [show, setShow] = useState(false);
  const toggle = ()=>setShow(prev=>!prev);
  const toggleForce = (val: boolean)=>{setShow(val)};
  const [field, setField] = useState(getInitField());
  const [what, setWhat] = useState<'add'|'edit'>('add');

  const onChange:TOnChangeInput = ({name, value})=>{
    setField(prev=>{
      return {
        ...prev,
        [name]: value
      }
    });
  };

  const onSubmit = ()=>{
    if(what==='add'){
      addDefaultValue(field);
    }else{
      editDefaultValue(field);
    }
    setWhat('add');
    toggle();
    setField(getInitField());
  };

  const onEditField = (f:IBaseStructureField)=>{
    setField(f);
    setWhat('edit');
    toggle();
  }
  
  return(
    <Fragment>
      <CustomModal
        show={show}
        toggleForce={toggleForce}
        title={getLangText(langObj, 'title-default-field')}
      >
        <CustomModalBody>
          <CustomColInput
            name='nameUA'
            label='nameUA'
            data={field as TObjKeyAny}
            onChange={onChange}
          />
          <CustomColInput
            name='nameRU'
            label='nameRU'
            data={field as TObjKeyAny}
            onChange={onChange}
          />
        </CustomModalBody>
        <CustomModalFooter>
          <LoadingBtn
            isLoading={false}
            title={getLangText(langObj, 'btn-add-field')}
            onClick={onSubmit}
          />
          <LoadingBtn
            isLoading={false}
            type={EColors.SECONDARY}
            title={getLangText(langObj, 'cancel')}
            onClick={toggle}
          />
        </CustomModalFooter>
      </CustomModal>
      {
        type===EFieldsTypes.WITH_DEFAULT?
        <Fragment>
          <div>
            {
              <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">{getLangText(langObj, 'name-field')}</th>
                  <th scope="col">{getLangText(langObj, 'actions')}</th>
                </tr>
              </thead>
              <tbody>
                {
                  defaults.map(f=>{
                    return(
                      <tr key={f.id}>
                        <td>{lang===ELangs.RU?f.nameRU:f.nameUA}</td>
                        <td>
                        <LoadingBtn 
                          isLoading={false} 
                          title={getLangText(langObj, 'edit')} 
                          onClick={()=>onEditField(f)}
                        />
                        <LoadingBtn 
                          isLoading={false} 
                          title={getLangText(langObj, 'btn-del-category')}
                          type={EColors.DANGER}
                          onClick={()=>delDefault(f.id)}
                        /> 
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
            }
          </div> 
          <LoadingBtn 
            isLoading={false} 
            title={getLangText(langObj, 'btn-add-field')} 
            onClick={toggle}
          />     
        </Fragment>
        :
        null
      }
    </Fragment>
  );
};

export default ProductStructureDefaultVal;