import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCategory, createSubCategory, deleteCategory, downCategory, editCategory, getCategorys, transferCategory, upCategory } from '../actions/categorys';
import { ETypeCustomErrors, IRejectWithValueError, IRejectWithValueValid } from '../../types/errors';
import { TObjKeyAnyString } from '../../types/global';
import { IResUpDownCategory } from '../../types/resTypes';
import { IStructureFieldProduct } from '../../types/structureProduct';

const afterUpDown = (category: ICategory, upDown: IResUpDownCategory): ICategory => {
  if (upDown.downCategory && category.nameTranslit === upDown.downCategory.nameTranslit) {
    category.zIndex = upDown.downCategory.zIndex;
    return category;
  }

  if (upDown.upCategory && category.nameTranslit === upDown.upCategory.nameTranslit) {
    category.zIndex = upDown.upCategory.zIndex;
    return category;
  }

  if (category.categorys.length > 0) {
    category.categorys.forEach(c => afterUpDown(c, upDown));
  }

  return category;
};

const sortCategorys = (categorys: ICategory[]) => {
  categorys.sort((a, b) => a.zIndex - b.zIndex);
  categorys.forEach(c => {
    if (c.categorys.length > 0) {
      sortCategorys(c.categorys);
    }
  });
};

type TTableProducts = { fields: IStructureFieldProduct[], characteristics: IStructureFieldProduct[] } | null;

export interface ICategory {
  nameUA: string;
  nameRU: string;
  nameTranslit: string;
  categorys: ICategory[];
  tableProduct: TTableProducts;
  zIndex: number;
}

export interface IMainStateCategory {
  categorys: ICategory[];
  category: ICategory | null;
  errorMessage: string;
  errorsValid: TObjKeyAnyString;
  isLoading: boolean;
  isLoaded: boolean;
}

const initialState: IMainStateCategory = {
  categorys: [],
  category: null,
  errorsValid: {},
  errorMessage: '',
  isLoading: false,
  isLoaded: false
};

const find = (categorys: ICategory[], nameTranslit: string): ICategory | null => {

  for (let i = 0; i < categorys.length; i++) {
    const c = categorys[i];
    //console.log(c.nameTranslit);
    if (c.nameTranslit === nameTranslit) {
      //console.log('nashol!!!!!!!! = ', c);
      return c;
    } else {

      if (c.categorys.length > 0) {
        return find(c.categorys, nameTranslit);
      }
    }
  }
  //console.log('tyt!!!');
  return null;
}

const sliceCategorys = createSlice({
  name: 'categorys',
  initialState,
  reducers: {
    findCategory(state, action: PayloadAction<string>) {
      const category = find(state.categorys, action.payload);
      state.category = category;
      if(!category){
        state.errorMessage = 'category not found!';
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(editCategory.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(editCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(editCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(createCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(transferCategory.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(transferCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(transferCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(downCategory.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(downCategory.fulfilled, (state, { payload }) => {
      //const newCategorys = afterUpDown(state.categorys, payload);
      //console.log('newCategorys = ', newCategorys);
      state.categorys.forEach(c => afterUpDown(c, payload));
      sortCategorys(state.categorys);
      //state.categorys = newCategorys;
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(downCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(upCategory.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(upCategory.fulfilled, (state, { payload }) => {
      //const newCategorys = afterUpDown(state.categorys, payload);
      //console.log('newCategorys = ', newCategorys);
      state.categorys.forEach(c => afterUpDown(c, payload));
      sortCategorys(state.categorys);
      //state.categorys = newCategorys;
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(upCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(deleteCategory.rejected, (state, { payload }) => {

      if (!payload) {
        state.errorMessage = 'unknoun error';
        state.isLoading = false;
        return;
      }

      if (payload.errorName === ETypeCustomErrors.VALID_ERROR) {
        (payload as IRejectWithValueValid).errors.forEach(err => {
          state.errorsValid[err.field] = err.message;
        });
      } else {
        state.errorMessage = (payload as IRejectWithValueError).message;
      }
      state.isLoading = false;
    });

    builder.addCase(createSubCategory.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
    });

    builder.addCase(createSubCategory.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(createSubCategory.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
    });

    builder.addCase(getCategorys.pending, (state) => {
      state.errorsValid = {};
      state.errorMessage = '';
      state.isLoading = true;
      state.isLoaded = false;
    });

    builder.addCase(getCategorys.fulfilled, (state, { payload }) => {
      //console.log('payload = ', payload);
      sortCategorys(payload);
      state.categorys = payload;
      state.isLoaded = true;
      state.isLoading = false;
    });

    builder.addCase(getCategorys.rejected, (state, { payload }) => {
      state.errorMessage = (payload as IRejectWithValueError).message;
      state.isLoading = false;
      state.isLoaded = true;
    });

  }
});

export const { findCategory } = sliceCategorys.actions;

export default sliceCategorys;