import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchCatatanSlice from './actions/searchCatatanSlice';
import formLoginRegisterSlice from './actions/formLoginRegisterSlice';
import apiUsersSlice from './actions/apiUsersSlice';

export const store = configureStore({
  reducer: {
    searchCatatanSlice: searchCatatanSlice,
    formLoginRegisterSlice: formLoginRegisterSlice,
    apiUsers: apiUsersSlice
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
