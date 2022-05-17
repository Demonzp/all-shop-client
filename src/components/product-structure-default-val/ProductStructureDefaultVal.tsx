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
}

const getInitField = ():IBaseStructureField => {
  return {
    id: createId(6),
    nameRU:'',
    nameUA:''
  }
};

const ProductStructureDefaultVal:React.FC<Props> = ({type, defaults, addDefaultValue})=>{
  const {langObj, lang} = useAppSelector(state=>state.lang);
  const [show, setShow] = useState(false);
  const toggle = ()=>setShow(prev=>!prev);
  const toggleForce = (val: boolean)=>{setShow(val)};
  const [field, setField] = useState(getInitField());

  const onChange:TOnChangeInput = ({name, value})=>{
    setField(prev=>{
      return {
        ...prev,
        [name]: value
      }
    });
  };

  const onSubmit = ()=>{
    addDefaultValue(field);
    toggle();
    setField(getInitField());
  };
  
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
            {defaults.map(f=>lang===ELangs.RU?f.nameRU:f.nameUA).join(', ')}
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