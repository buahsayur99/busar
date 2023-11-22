import { createSlice } from "@reduxjs/toolkit";

type initialStateProps = {
    active: Record<string, boolean>;
    checkeds: any[];
}

const initialState: initialStateProps = {
    active: { navDashboard: false },
    checkeds: []
}

const onOffSlice = createSlice({
    name: "on off slice",
    initialState,
    reducers: {
        activeReducer: (state, action) => {
            state.active = { ...state.active, ...action.payload }
        },
        updateCheckeds: (state, action) => {
            state.checkeds = action.payload
        }
    }
})

export const { activeReducer, updateCheckeds } = onOffSlice.actions
export default onOffSlice.reducer
