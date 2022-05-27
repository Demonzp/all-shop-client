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
import { getCategorys } from '../../store/actions/categorys';
import { addProductStructureTable, createProductStructureTable, delProductStructureTable, editProductStructureTable } from '../../store/actions/productStructureTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { findCategory } from '../../store/slices/categorys';
import { addCharacteristic, addField, delCharacteristic, delField, editCharacteristic, editField, setFields } from '../../store/slices/productStructureTable';
import { EColors } from '../../types/colors';
import { TObjKeyAny, TOnChangeInput } from '../../types/global';
import { ERoutes } from '../../types/routes';
import { EFieldsTypes, IBaseStructureField, IStructureFieldProduct } from '../../types/structureProduct';


const getInitField = (): IStructureFieldProduct => {
  return {
    id: createId(6),
    nameRU: '',
    nameUA: '',
    type: EFieldsTypes.STRING,
    isCanDel: true,
    length: '40',
    isNotNull: true,
    isCharact: false,
    isMult: false,
    defaults: []
  };
};

const ProductStructureTable = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const refBtnBack = useRef<HTMLButtonElement>(null);
  const { langObj } = useAppSelector(state => state.lang);
  const { fields, characteristics, saveActionType, isLoading: isLoadingField } = useAppSelector(state => state.productStructureTable);
  const { category, isLoaded, isLoading } = useAppSelector(state => state.categorys);
  const [field, setField] = useState<IStructureFieldProduct>(getInitField());
  const [where, setWhere] = useState<'field' | 'characteristic'>('field');
  const [typeAction, setTypeAction] = useState<'add' | 'edit'>('add');

  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();

  const toggle = () => setShow(prev => !prev);

  const toggleForce = (val: boolean) => setShow(val);

  useEffect(() => {
    console.log('categoryId = ', categoryId);
    if (categoryId) {
      if (!isLoaded) {
        dispatch(getCategorys());
      } else {
        dispatch(findCategory(categoryId));
      }
    }
  }, [categoryId, isLoaded]);

  useEffect(() => {
    console.log('ProductStructureTable category = ', category);
    if (category) {
      dispatch(setFields(category.tableProduct));
    }
  }, [category]);

  const onEditField = (id: string) => {
    const field = fields.find(f => f.id === id);

    if (field) {
      setWhere('field');
      setTypeAction('edit');
      setField(field);
      toggle();
    }
    //console.log('editField = ', id);
  };

  const onEditCharacteristic = (id: string) => {
    const char = characteristics.find(f => f.id === id);

    if (char) {
      setWhere('characteristic');
      setTypeAction('edit');
      setField(char);
      toggle();
    }
  };

  const onDelField = (field: IStructureFieldProduct) => {
    if(saveActionType==='add'){
      dispatch(delField(field.id));
    }else{
      if(field.dId){
        dispatch(delProductStructureTable({
          id: field.dId,
          nameTranslit: categoryId!
        }));
      }
    }
    //dispatch(delField(id));
    //console.log('delField = ', id);
  };

  const onDelCharacteristic = (field: IStructureFieldProduct) => {
    if(saveActionType==='add'){
      dispatch(delCharacteristic(field.id));
    }else{
      console.log('delField = ', field);
      if(field.dId){
        dispatch(delProductStructureTable({
          id: field.dId,
          nameTranslit: categoryId!
        }));
      }
    }
  };

  const onAddField = () => {
    setWhere('field');
    setTypeAction('add');
    toggle();
  };

  const onAddCharacteristic = () => {
    setWhere('characteristic');
    setField({
      ...getInitField(),
      isCharact: true
    });
    setTypeAction('add');
    toggle();
  };

  const onChange: TOnChangeInput = ({ name, value }) => {
    let val: any = value;
    let key1: keyof IStructureFieldProduct = 'isNotNull';
    let key2: keyof IStructureFieldProduct = 'isMult';
    //console.log('val = ',val);
    if (name === key1 || name === key2) {
      if (val === 'true') {
        val = true;
      } else {
        val = false;
      }
    }
    setField(prev => {
      return {
        ...prev,
        [name]: val
      }
    })
  };

  const onSubmit = () => {
    if (where === 'field') {
      if(saveActionType==='add'){
        if (typeAction === 'add') {
          dispatch(addField(field));
        } else {
          dispatch(editField(field));
        }
        //console.log('field = ', field);
      }else{
        if (typeAction === 'add') {
          dispatch(addProductStructureTable({
            field,
            nameTranslit: categoryId!
          }));
        } else {
          dispatch(editProductStructureTable({
            field,
            nameTranslit: categoryId!
          }));
        }
        
        console.log('typeAction = ', typeAction);
      }
      setField(getInitField());
      toggle();
    } else {
      if(saveActionType==='add'){
        if (typeAction === 'add') {
          dispatch(addCharacteristic(field));
        } else {
          dispatch(editCharacteristic(field));
        }
        //console.log('characteristic = ', field);
      }else{
        if (typeAction === 'add') {
          dispatch(addProductStructureTable({
            field,
            nameTranslit: categoryId!
          }));
        } else {
          dispatch(editProductStructureTable({
            field,
            nameTranslit: categoryId!
          }));
        }
        console.log('typeAction = ', typeAction);
      }
      setField(getInitField());
      toggle();
    }

  };

  const onSave = () => {
    if (categoryId) {
      if(saveActionType==='add'){
        dispatch(createProductStructureTable(categoryId))
          .unwrap()
          .then(() => {
            if(refBtnBack.current){
              console.log('click back!!!!!');
              refBtnBack.current.click();
            }
          });
      }
    }
  };

  const addDefaultValue = (data: IBaseStructureField) => {
    setField(prev => {
      return {
        ...prev,
        defaults: prev.defaults.concat(data)
      }
    });
  };

  const delDefault = (data: string) => {
    setField(prev => {
      return {
        ...prev,
        defaults: prev.defaults.filter(f => f.id !== data)
      }
    });
  };

  const editDefault = (data: IBaseStructureField) => {
    setField(prev => {
      return {
        ...prev,
        defaults: [...prev.defaults.filter(f => f.id !== data.id), data]
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
          <div className="form-check" style={{ marginTop: 10 }}>
            <input
              id="form-check"
              className="form-check-input"
              type="checkbox"
              checked={field.isNotNull}
              onChange={e => onChange({ name: 'isNotNull' as keyof IStructureFieldProduct, value: String(e.target.checked) })}
            />
            <label className="col-sm-2 col-form-label" htmlFor="form-check"><LangText k="title-check-is-require" /></label>
          </div>
          {
            typeAction==='add'?
            <div className="row mb-3 p-t-20">
              <label className="col-sm-2 col-form-label"><LangText k="title-type" /></label>
              <div className="col-sm-5">
                <select
                  className="form-select form-select-sm"
                  aria-label="form-select-sm example"
                  value={field.type}
                  onChange={(e) => onChange({ name: 'type', value: e.target.value })}
                >
                  {
                    getOptionsFromEnum(EFieldsTypes).map(s => {
                      return <option key={s.value} value={s.value}>{getLangText(langObj, s.label)}</option>
                    })
                  }
                </select>
              </div>
            </div>
            :
            <CustomColInput
              name='type'
              disabled={true}
              label={getLangText(langObj, 'title-type')}
              data={(field as TObjKeyAny)}
              onChange={onChange}
            />
          }
          {
            field.type === EFieldsTypes.STRING ?
              <CustomColInput
                name='length'
                label={getLangText(langObj, 'title-max-lenght')}
                data={(field as TObjKeyAny)}
                onChange={onChange}
              />
              :
              <Fragment></Fragment>
          }
          {
            field.type === EFieldsTypes.WITH_DEFAULT ?
              <div className="form-check" style={{ marginTop: 10 }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={field.isMult}
                  onChange={e => onChange({ name: 'isMult' as keyof IStructureFieldProduct, value: String(e.target.checked) })}
                />
                <label className="col-sm-2 col-form-label"><LangText k="title-check-is-multiple" /></label>
              </div>
              :
              <Fragment></Fragment>
          }
          <ProductStructureDefaultVal
            type={field.type}
            defaults={field.defaults}
            addDefaultValue={addDefaultValue}
            delDefault={delDefault}
            editDefaultValue={editDefault}
          />
        </CustomModalBody>
        <CustomModalFooter>
          <LoadingBtn
            isLoading={isLoadingField}
            title={getLangText(langObj, 'btn-add-field')}
            onClick={onSubmit}
          />
          <LoadingBtn
            isLoading={isLoadingField}
            type={EColors.SECONDARY}
            title={getLangText(langObj, 'cancel')}
            onClick={toggle}
          />
        </CustomModalFooter>
      </CustomModal>
      {
        isLoading ?
          <div>Loading...</div>
          :
          <Fragment>
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
                      <th scope="col">lenth</th>
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
                  isLoading={isLoadingField}
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
                      <th scope="col">lenth</th>
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
                  isLoading={isLoadingField}
                  type={EColors.SUCCESS}
                  title={getLangText(langObj, 'btn-add-field')}
                  onClick={onAddCharacteristic}
                />
              </div>
            </div>
            <div className='d-flex justify-content-around p-t-20'>
              {
                saveActionType==='add'?
                <LoadingBtn
                  isLoading={isLoadingField}
                  title={getLangText(langObj, 'save')}
                  onClick={onSave}
                />
                :
                null
              }
              <BtnLink
                ref={refBtnBack}
                type={EColors.SECONDARY}
                to={ERoutes.CATEGORY_MANAGER}
                isLoading={isLoadingField}
              >
                <LangText k={'cancel'} />
              </BtnLink>
            </div>
          </Fragment>
      }
    </div>
  )
};

export default ProductStructureTable;