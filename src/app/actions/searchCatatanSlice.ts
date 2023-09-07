import { createSlice } from '@reduxjs/toolkit';

type activeButtonProps = {
    activeInputSearch: boolean;
    activeLogin: boolean;
}

const initialState: activeButtonProps = {
    activeInputSearch: false,
    activeLogin: false
}

export const searchCatatanSlice = createSlice({
    name: "active button",
    initialState,
    reducers: {
        activeSearch: (state, action) => {
            state.activeInputSearch = action.payload;
        },
        activeLogin: (state, action) => {
            state.activeInputSearch = action.payload;
        }
    }
})

export const { activeSearch, activeLogin } = searchCatatanSlice.actions;
export default searchCatatanSlice.reducer;
