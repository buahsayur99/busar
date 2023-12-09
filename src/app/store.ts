import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchCatatanSlice from './actions/searchCatatanSlice';
import formLoginRegisterSlice from './actions/formLoginRegisterSlice';
import apiUsersSlice from './actions/apiUsersSlice';
import apiAddressSlice from "./actions/apiAddressSlice";
import onOffSlice from './actions/onOffSlice';
import apiProductSlice from './actions/apiProductSlice';
import apiCategory from './actions/apiCategory';
import apiWishlist from './actions/apiWishlist';

export const store = configureStore({
  reducer: {
    searchCatatanSlice: searchCatatanSlice,
    formLoginRegisterSlice: formLoginRegisterSlice,
    apiUsers: apiUsersSlice,
    apiAddress: apiAddressSlice,
    onOffSlice: onOffSlice,
    apiProduct: apiProductSlice,
    apiCategory: apiCategory,
    apiWishlist: apiWishlist,
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
