import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TObjKeyAnyString } from '../../types/global';
import { EFieldsTypes, IStructureFieldProduct } from '../../types/structureProduct';
import { addProductStructureTable, createProductStructureTable, delProductStructureTable, editProductStructureTable } from '../actions/productStructureTable';
import { isRejectWithValueError } from '../../types/errors';

interface IInitState {
  fields: IStructureFieldProduct[];
  characteristics: IStructureFieldProduct[];
  errorsValid: TObjKeyAnyString;
  errorMessage: string;
  saveActionType: 'add'|'edit';
  isLoading: boolean
}

const initialState: IInitState = {
  fields: [
    {
      id: 'name',
      nameUA: 'Назва товару',
      nameRU: 'Название товара',
      type: EFieldsTypes.STRING,
      isCanDel: false,
      length: '80',
      isNotNull: true,
      isCharact: false,
      isMult: false,
      defaults: []
    },
    {
      id: 'price',
      nameUA: 'Ціна',
      nameRU: 'Цена',
      type: EFieldsTypes.NUMBER,
      isCanDel: false,
      length: '0',
      isNotNull: true,
      isCharact: false,
      isMult: false,
      defaults: []
    },
    {
      id: 'number',
      nameUA: 'Кількість товару',
      nameRU: 'Количество товара',
      type: EFieldsTypes.NUMBER,
      isCanDel: false,
      length: '0',
      isNotNull: true,
      isCharact: false,
      isMult: false,
      defaults: []
    },
    {
      id: 'mainFoto',
      nameUA: 'Головна світлина',
      nameRU: 'Главная фотография',
      type: EFieldsTypes.FILE,
      isCanDel: false,
      length: '40',
      isNotNull: false,
      isCharact: false,
      isMult: false,
      defaults: []
    },
    {
      id: 'fotos',
      nameUA: 'Світлини',
      nameRU: 'Фотографии',
      type: EFieldsTypes.FILE,
      isCanDel: false,
      length: '300',
      isNotNull: false,
      isCharact: false,
      isMult: false,
      defaults: []
    },
    {
      id: 'discription',
      nameUA: 'Опис товару',
      nameRU: 'Описание товара',
      type: EFieldsTypes.STRING,
      isCanDel: false,
      length: '400',
      isNotNull: false,
      isCharact: false,
      isMult: false,
      defaults: []
    },
    {
      id: 'createdAt',
      nameUA: 'Додано товар числа',
      nameRU: 'Добавлен товар числа',
      type: EFieldsTypes.DATE,
      isCanDel: false,
      length: '264',
      isNotNull: true,
      isCharact: false,
      isMult: false,
      defaults: []
    },
    {
      id: 'updatedAt',
      nameUA: 'Змінено товар числа',
      nameRU: 'Изменен товар числа',
      type: EFieldsTypes.DATE,
      isCanDel: false,
      isNotNull: true,
      length: '264',
      isCharact: false,
      isMult: false,
      defaults: []
    },
    {
      id: 'stock',
      nameUA: 'Акція',
      nameRU: 'Акция',
      type: EFieldsTypes.STRING,
      isCanDel: false,
      isNotNull: false,
      length: '264',
      isCharact: false,
      isMult: false,
      defaults: []
    },
    {
      id: 'uniqField',
      nameUA: 'Унікальний ідентифікатор',
      nameRU: 'Уникальный идентификатор',
      type: EFieldsTypes.UNIQUE,
      isCanDel: true,
      isNotNull: true,
      length: '264',
      isCharact: false,
      isMult: false,
      defaults: []
    },

  ],
  characteristics: [],
  errorsValid: {},
  errorMessage: '',
  saveActionType: 'add',
  isLoading: false
};

type TSetFields = {fields:IStructureFieldProduct[],characteristics:IStructureFieldProduct[]}|null;

const sliceProductStructureTable = createSlice({
  name: 'productStructureTable',
  initialState,
  reducers: {

    setFields(state, action: PayloadAction<TSetFields>){
      if(action.payload){
        state.saveActionType = 'edit';
        state.fields = action.payload.fields;
        state.characteristics = action.payload.characteristics;
      }else{
        state.saveActionType = 'add';
        state.fields = initialState.fields;
        state.characteristics = initialState.characteristics;
      }
    },

    addField(state, action: PayloadAction<IStructureFieldProduct>) {
      const field = action.payload;
      if(field.type!==EFieldsTypes.WITH_DEFAULT){
        field.defaults = [];
      }
      state.fields.push(field);
    },

    editField(state, action: PayloadAction<IStructureFieldProduct>){
      const field = action.payload;
      if(field.type!==EFieldsTypes.WITH_DEFAULT){
        field.defaults = [];
      }
      const idx = state.fields.findIndex(f=>f.id===field.id);
      if(idx>=0){
        state.fields[idx] = field;
      }
    },

    delField(state, action: PayloadAction<string>) {
      const idx = state.fields.findIndex(f => f.id === action.payload);
      if(idx>=0){
        state.fields.splice(idx, 1);
      }
    },

    addCharacteristic(state, action: PayloadAction<IStructureFieldProduct>){
      const field = action.payload;
      if(field.type!==EFieldsTypes.WITH_DEFAULT){
        field.defaults = [];
      }
      state.characteristics.push(field);
    },

    editCharacteristic(state, action: PayloadAction<IStructureFieldProduct>){
      const field = action.payload;
      if(field.type!==EFieldsTypes.WITH_DEFAULT){
        field.defaults = [];
      }
      const idx = state.characteristics.findIndex(f=>f.id===field.id);
      if(idx>=0){
        state.characteristics[idx] = field;
      }
    },

    delCharacteristic(state, action: PayloadAction<string>){
      const idx = state.characteristics.findIndex(f=>f.id===action.payload);
      if(idx>=0){
        state.characteristics.splice(idx, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createProductStructureTable.pending, (state)=>{
      state.errorMessage = '';
      state.errorsValid = {};
      state.isLoading = true;
    });

    builder.addCase(createProductStructureTable.fulfilled, (state)=>{
      state.isLoading = false;
    });

    builder.addCase(createProductStructureTable.rejected, (state, { payload }) => {
      if(!payload){
        state.errorMessage = 'unknoun error';
        state.isLoading = false;
        return;
      }
      
      if (!isRejectWithValueError(payload)) {
        payload.errors.forEach(err => {
          state.errorsValid[err.field] = err.message;
        });
      } else {
        state.errorMessage = payload.message;
      }

      state.isLoading = false;
    });

    builder.addCase(editProductStructureTable.pending, (state)=>{
      state.errorMessage = '';
      state.errorsValid = {};
      state.isLoading = true;
    });

    builder.addCase(editProductStructureTable.fulfilled, (state, {payload})=>{
      const fieldIdx = state.fields.findIndex(f=>f.id===payload.field.id);
      if(fieldIdx>=0){
        state.fields[fieldIdx] = payload.field;
      }

      const characteristicsIdx = state.characteristics.findIndex(f=>f.id===payload.field.id);

      if(characteristicsIdx>=0){
        state.characteristics[characteristicsIdx] = payload.field;
      }

      state.isLoading = false;
    });

    builder.addCase(editProductStructureTable.rejected, (state, { payload }) => {
      if(!payload){
        state.errorMessage = 'unknoun error';
        state.isLoading = false;
        return;
      }
      
      if (!isRejectWithValueError(payload)) {
        payload.errors.forEach(err => {
          state.errorsValid[err.field] = err.message;
        });
      } else {
        state.errorMessage = payload.message;
      }

      state.isLoading = false;
    });

    builder.addCase(delProductStructureTable.pending, (state)=>{
      state.errorMessage = '';
      state.errorsValid = {};
      state.isLoading = true;
    });

    builder.addCase(delProductStructureTable.fulfilled, (state, {payload})=>{
      const fieldIdx = state.fields.findIndex(f=>f.dId===payload.field);
      console.log('fieldIdx = ', fieldIdx);
      if(fieldIdx>=0){
        state.fields.splice(fieldIdx, 1);
      }

      const characteristicsIdx = state.characteristics.findIndex(f=>f.dId===payload.field);
      console.log('characteristicsIdx = ', characteristicsIdx);
      if(characteristicsIdx>=0){
        state.characteristics.splice(characteristicsIdx, 1);
      }

      state.isLoading = false;
    });

    builder.addCase(delProductStructureTable.rejected, (state, { payload }) => {
      if(!payload){
        state.errorMessage = 'unknoun error';
        state.isLoading = false;
        return;
      }
      
      if (!isRejectWithValueError(payload)) {
        payload.errors.forEach(err => {
          state.errorsValid[err.field] = err.message;
        });
      } else {
        state.errorMessage = payload.message;
      }

      state.isLoading = false;
    });

    builder.addCase(addProductStructureTable.pending, (state)=>{
      state.errorMessage = '';
      state.errorsValid = {};
      state.isLoading = true;
    });

    builder.addCase(addProductStructureTable.fulfilled, (state, {payload})=>{
      //console.log('payload.field = ', payload.field);
      const field = payload.field as IStructureFieldProduct;

      if(field.isCharact){
        state.characteristics.push(field);
      }else{
        state.fields.push(field);
      }
      
      state.isLoading = false;
    });

    builder.addCase(addProductStructureTable.rejected, (state, { payload }) => {
      if(!payload){
        state.errorMessage = 'unknoun error';
        state.isLoading = false;
        return;
      }
      
      if (!isRejectWithValueError(payload)) {
        payload.errors.forEach(err => {
          state.errorsValid[err.field] = err.message;
        });
      } else {
        state.errorMessage = payload.message;
      }

      state.isLoading = false;
    });
  }
});

export const {
  setFields, 
  addField, 
  editField,
  delField, 
  addCharacteristic,
  editCharacteristic, 
  delCharacteristic
} = sliceProductStructureTable.actions;

export default sliceProductStructureTable;