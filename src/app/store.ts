import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchCatatanSlice from './actions/searchCatatanSlice';

export const store = configureStore({
  reducer: {
    activeButton: searchCatatanSlice
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
