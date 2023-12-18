import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import formLoginRegisterSlice from './actions/formLoginRegisterSlice';
import apiUsersSlice from './actions/apiUsersSlice';
import apiAddressSlice from "./actions/apiAddressSlice";
import onOffSlice from './actions/onOffSlice';
import apiProductSlice from './actions/apiProductSlice';
import apiCategory from './actions/apiCategory';
import apiWishlist from './actions/apiWishlist';
import apiCartSlice from './actions/apiCartSlice';

export const store = configureStore({
  reducer: {
    formLoginRegisterSlice: formLoginRegisterSlice,
    apiUsers: apiUsersSlice,
    apiAddress: apiAddressSlice,
    onOffSlice: onOffSlice,
    apiProduct: apiProductSlice,
    apiCategory: apiCategory,
    apiWishlist: apiWishlist,
    apiCart: apiCartSlice,
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
