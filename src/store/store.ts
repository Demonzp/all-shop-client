import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sliceLang from './slices/lang';
import sliceDB from './slices/sliceDB';
import sliceUser from './slices/user';

export const store = configureStore({
  reducer: {
    db: sliceDB.reducer,
    user: sliceUser.reducer,
    lang: sliceLang.reducer
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
