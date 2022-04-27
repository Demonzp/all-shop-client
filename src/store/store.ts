import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sliceCategorys from './slices/categorys';
import sliceLang from './slices/lang';
import sliceDB from './slices/sliceDB';
import sliceUser from './slices/user';

export const store = configureStore({
  reducer: {
    db: sliceDB.reducer,
    user: sliceUser.reducer,
    lang: sliceLang.reducer,
    categorys: sliceCategorys.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
