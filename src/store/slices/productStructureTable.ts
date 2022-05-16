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
      id: '1',
      nameUA: 'Назва товару',
      nameRU: 'Название товара',
      type: EFieldsTypes.STRING,
      isCanDel: false,
      defaults: []
    },
    {
      id: '2',
      nameUA: 'Ціна',
      nameRU: 'Цена',
      type: EFieldsTypes.NUMBER,
      isCanDel: false,
      defaults: []
    },
    {
      id: '3',
      nameUA: 'Кількість товару',
      nameRU: 'Количество товара',
      type: EFieldsTypes.NUMBER,
      isCanDel: false,
      defaults: []
    },
    {
      id: '4',
      nameUA: 'Головна світлина',
      nameRU: 'Главная фотография',
      type: EFieldsTypes.FILE,
      isCanDel: false,
      defaults: []
    },
    {
      id: '5',
      nameUA: 'Світлини',
      nameRU: 'Фотографии',
      type: EFieldsTypes.FILE,
      isCanDel: false,
      defaults: []
    },
    {
      id: '6',
      nameUA: 'Опис товару',
      nameRU: 'Описание товара',
      type: EFieldsTypes.STRING,
      isCanDel: false,
      defaults: []
    },
    {
      id: '7',
      nameUA: 'Унікальний ідентифікатор',
      nameRU: 'Уникальный идентификатор',
      type: EFieldsTypes.UNIQUE,
      isCanDel: true,
      defaults: []
    },
  ],
  characteristics: [],
  errorsValid: {},
  errorMessage: '',
  isLoading: false
};

const sliceProductStructureTable = createSlice({
  name: 'productStructureTable',
  initialState,
  reducers: {

    addField(state, action: PayloadAction<IStructureFieldProduct>) {
      state.fields.push(action.payload);
    },

    editField(state, action: PayloadAction<IStructureFieldProduct>){
      const idx = state.fields.findIndex(f=>f.id===action.payload.id);
      if(idx>=0){
        state.fields[idx] = action.payload;
      }
    },

    delField(state, action: PayloadAction<string>) {
      const idx = state.fields.findIndex(f => f.id === action.payload);
      if(idx>=0){
        state.fields.splice(idx, 1);
      }
    },

    addCharacteristic(state, action: PayloadAction<IStructureFieldProduct>){
      state.characteristics.push(action.payload);
    },

    editCharacteristic(state, action: PayloadAction<IStructureFieldProduct>){
      const idx = state.characteristics.findIndex(f=>f.id===action.payload.id);
      if(idx>=0){
        state.characteristics[idx] = action.payload;
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
  addField, 
  editField,
  delField, 
  addCharacteristic,
  editCharacteristic, 
  delCharacteristic
} = sliceProductStructureTable.actions;

export default sliceProductStructureTable;