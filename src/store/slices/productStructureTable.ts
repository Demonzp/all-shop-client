import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TObjKeyAnyString } from '../../types/global';
import { EFieldsTypes, IStructureFieldProduct } from '../../types/structureProduct';
import { addProductStructureTable } from '../actions/productStructureTable';
import { isRejectWithValueError } from '../../types/errors';

interface IInitState {
  fields: IStructureFieldProduct[],
  characteristics: IStructureFieldProduct[],
  errorsValid: TObjKeyAnyString,
  errorMessage: string,
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
      defaults: []
    },

  ],
  characteristics: [],
  errorsValid: {},
  errorMessage: '',
  isLoading: false
};

type TSetFields = {fields:IStructureFieldProduct[],characteristics:IStructureFieldProduct[]}|null;

const sliceProductStructureTable = createSlice({
  name: 'productStructureTable',
  initialState,
  reducers: {

    setFields(state, action: PayloadAction<TSetFields>){
      if(action.payload){
        state.fields = action.payload.fields;
        state.characteristics = action.payload.characteristics;
      }else{
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
    builder.addCase(addProductStructureTable.pending, (state)=>{
      state.errorMessage = '';
      state.errorsValid = {};
      state.isLoading = false;
    });

    builder.addCase(addProductStructureTable.fulfilled, (state)=>{
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