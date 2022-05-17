import { Fragment, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import BtnLink from '../../components/btn-link';
import CustomColInput from '../../components/custom-col-input';
import CustomModal from '../../components/custom-modal';
import CustomModalBody from '../../components/custom-modal-body';
import CustomModalFooter from '../../components/custom-modal-footer';
import LangText from '../../components/lang-text';
import LoadingBtn from '../../components/loading-btn';
import ProductStructureDefaultVal from '../../components/product-structure-default-val/ProductStructureDefaultVal';
import ProductStructureTableItem from '../../components/product-structure-table-item';
import { createId, getLangText, getOptionsFromEnum } from '../../services/global';
import { addProductStructureTable } from '../../store/actions/productStructureTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCharacteristic, addField, delCharacteristic, delField, editCharacteristic, editField } from '../../store/slices/productStructureTable';
import { EColors } from '../../types/colors';
import { TObjKeyAny, TOnChangeInput } from '../../types/global';
import { ERoutes } from '../../types/routes';
import { EFieldsTypes, IBaseStructureField, IStructureFieldProduct } from '../../types/structureProduct';


const getInitField = ():IStructureFieldProduct=>{
  return{
    id: createId(6),
    nameRU: '',
    nameUA: '',
    type: EFieldsTypes.STRING,
    isCanDel: true,
    defaults: []
  };
};

const ProductStructureTable = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const refBtnBack = useRef<HTMLButtonElement>(null);
  const { langObj } = useAppSelector(state => state.lang);
  const { fields, characteristics } = useAppSelector(state => state.productStructureTable);
  const [field, setField] = useState<IStructureFieldProduct>(getInitField());
  const [where, setWhere] = useState<'field' | 'characteristic'>('field');
  const [typeAction, setTypeAction] = useState<'add' | 'edit'>('add');

  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();

  const toggle = () => setShow(prev => !prev);

  const toggleForce = (val: boolean) => setShow(val);

  useEffect(() => {
    console.log('categoryId = ', categoryId);
  }, [categoryId]);

  const onEditField = (id: string) => {
    const field = fields.find(f => f.id === id);

    if (field) {
      setWhere('field');
      setTypeAction('edit');
      setField(field);
      toggle();
    }
    console.log('editField = ', id);
  };

  const onEditCharacteristic = (id: string) => {
    const char = characteristics.find(f => f.id === id);

    if (char) {
      setWhere('characteristic');
      setTypeAction('edit');
      setField(char);
      toggle();
    }
  }

  const onDelField = (id: string) => {
    dispatch(delField(id));
    console.log('delField = ', id);
  };

  const onDelCharacteristic = (id: string) => {
    dispatch(delCharacteristic(id));
  };

  const onAddField = () => {
    setWhere('field');
    setTypeAction('add');
    toggle();
  };

  const onAddCharacteristic = () => {
    setWhere('characteristic');
    setTypeAction('add');
    toggle();
  }

  const onChange: TOnChangeInput = ({ name, value }) => {
    setField(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  };

  const onSubmit = () => {
    if (where === 'field') {
      if (typeAction === 'add') {
        dispatch(addField(field));
      } else {
        dispatch(editField(field));
      }
      console.log('field = ', field);
    } else {
      if (typeAction === 'add') {
        dispatch(addCharacteristic(field));
      } else {
        dispatch(editCharacteristic(field));
      }
      console.log('characteristic = ', field);
    }
    setField(getInitField());
    toggle();
  };

  const onSave = () => {
    if (categoryId) {
      dispatch(addProductStructureTable(categoryId))
        .unwrap()
        .then(() => refBtnBack.current?.click());
    }
  };

  const addDefaultValue = (data: IBaseStructureField)=>{
    setField(prev=>{
      return {
        ...prev,
        defaults: prev.defaults.concat(data)
      }
    });
  };

  return (
    <div className='container'>
      <CustomModal
        show={show}
        toggleForce={toggleForce}
        title={getLangText(langObj, 'btn-add-field')}
      >
        <CustomModalBody>
          <CustomColInput
            name='nameUA'
            label='nameUA'
            data={(field as TObjKeyAny)}
            onChange={onChange}
          />
          <CustomColInput
            name='nameRU'
            label='nameRU'
            data={(field as TObjKeyAny)}
            onChange={onChange}
          />
          <div className="row mb-3 p-t-20">
            <label className="col-sm-2 col-form-label"><LangText k="title-type" /></label>
            <div className="col-sm-5">
              <select
                className="form-select form-select-sm"
                aria-label="form-select-sm example"
                onChange={(e) =>onChange({ name: 'type', value: e.target.value })}
              >
                {
                  getOptionsFromEnum(EFieldsTypes).map(s => {
                    return <option key={s.value} value={s.value}>{getLangText(langObj, s.label)}</option>
                  })
                }
              </select>
            </div>
          </div>
          <ProductStructureDefaultVal 
            type={field.type} 
            defaults={field.defaults}
            addDefaultValue={addDefaultValue}
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
      <div className="card">
        <div className='card-body'>
          <h5 className="card-title">
            {getLangText(langObj, 'title-fields')}
          </h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">{getLangText(langObj, 'name-field')}</th>
                <th scope="col">{getLangText(langObj, 'type-filed')}</th>
                <th scope="col">{getLangText(langObj, 'actions')}</th>
              </tr>
            </thead>
            <tbody>
              {
                fields.map(f => {
                  return <ProductStructureTableItem
                    key={f.id}
                    field={f}
                    edit={onEditField}
                    del={onDelField}
                  />
                })
              }
            </tbody>
          </table>
          <LoadingBtn
            type={EColors.SUCCESS}
            isLoading={false}
            title={getLangText(langObj, 'btn-add-field')}
            onClick={onAddField}
          />
        </div>
      </div>

      <div className="card">
        <div className='card-body'>
          <h5 className="card-title">
            {getLangText(langObj, 'titile-characteristic')}
          </h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">{getLangText(langObj, 'name-field')}</th>
                <th scope="col">{getLangText(langObj, 'type-filed')}</th>
                <th scope="col">{getLangText(langObj, 'actions')}</th>
              </tr>
            </thead>
            <tbody>
              {
                characteristics.map(f => {
                  return <ProductStructureTableItem
                    key={f.id}
                    field={f}
                    edit={onEditCharacteristic}
                    del={onDelCharacteristic}
                  />
                })
              }
            </tbody>
          </table>
          <LoadingBtn
            isLoading={false}
            type={EColors.SUCCESS}
            title={getLangText(langObj, 'btn-add-field')}
            onClick={onAddCharacteristic}
          />
        </div>
      </div>
      <div className='d-flex justify-content-around p-t-20'>
        <LoadingBtn
          isLoading={false}
          title={getLangText(langObj, 'save')}
          onClick={onSave}
        />
        <BtnLink
          ref={refBtnBack}
          type={EColors.SECONDARY}
          to={ERoutes.CATEGORY_MANAGER}
        >
          <LangText k={'cancel'} />
        </BtnLink>
      </div>
    </div>
  )
};

export default ProductStructureTable;