import { createSlice } from "@reduxjs/toolkit";

type activeTransitionFormProps = {
    formLogin: boolean;
    bannerLogin: boolean;
    formRegister: boolean;
    bannerRegiter: boolean;
    onOffForm: boolean;
}

type initialStateProps = {
    activeTransitionForm: activeTransitionFormProps
}

const initialState: initialStateProps = {
    activeTransitionForm: { formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true, onOffForm: true }
}

export const formLoginRegiterSlice = createSlice({
    name: "form login regiter slice",
    initialState,
    reducers: {
        activeFormTransition: (state, action) => {
            state.activeTransitionForm = { ...state.activeTransitionForm, ...action.payload }
        }
    }
});

export const { activeFormTransition } = formLoginRegiterSlice.actions
export default formLoginRegiterSlice.reducer;