import { createSlice } from '@reduxjs/toolkit';

type activeButton = {
    activeInputSearch: boolean;
}

const initialState: activeButton = {
    activeInputSearch: false
}

export const activeButton = createSlice({
    name: "active button",
    initialState,
    reducers: {
        activeSearch: (state, action) => {
            state.activeInputSearch = action.payload;
        }
    }
})

export const { activeSearch } = activeButton.actions;
export default activeButton.reducer;
