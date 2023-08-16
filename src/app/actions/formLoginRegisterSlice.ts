import { createSlice } from "@reduxjs/toolkit";

type activeTransitionFormProps = {
    formLogin: boolean;
    bannerLogin: boolean;
    formRegister: boolean;
    bannerRegiter: boolean;
    onOffForm: boolean;
    forgetPassword?: boolean
}

type initialStateProps = {
    activeTransitionForm: activeTransitionFormProps;
    validasiInput: Record<string, { status: boolean, text: string }>
    inputValueForm: { email: string, password: string, confirmasiPassword: string }
    activeAlert: Record<string, { status: boolean, text: string | null, nameButton?: string }>
}

const initialState: initialStateProps = {
    activeTransitionForm: {
        formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true, onOffForm: false, forgetPassword: false
    },
    validasiInput: {
        email: { status: false, text: "" },
        password: { status: false, text: "" },
        confirmasiPassword: { status: false, text: "" }
    },
    inputValueForm: {
        email: "", password: "", confirmasiPassword: ""
    },
    activeAlert: {
        alertText: { status: false, text: null }
    }
}

export const formLoginRegiterSlice = createSlice({
    name: "form login regiter slice",
    initialState,
    reducers: {
        activeFormTransition: (state, action) => {
            state.activeTransitionForm = { ...state.activeTransitionForm, ...action.payload }
        },
        updateValidasi: (state, action) => {
            state.validasiInput = { ...state.validasiInput, ...action.payload }
        },
        updateInputValue: (state, action) => {
            state.inputValueForm = { ...state.inputValueForm, ...action.payload }
        },
        resetValidasi: (state) => {
            state.validasiInput = { email: { status: false, text: "" }, password: { status: false, text: "" } };
            state.inputValueForm = { email: "", password: "", confirmasiPassword: "" };
        },
        resetTrasitionForm: (state) => {
            state.activeTransitionForm = { formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true, onOffForm: false }
        },
        updateActiveAlert: (state, action) => {
            state.activeAlert = { ...state.activeAlert, ...action.payload }
        },
        resetActiveAlert: (state) => {
            state.activeAlert = { alertText: { status: false, text: null } }
        }
    }
});

export const { activeFormTransition, updateValidasi, updateInputValue, resetValidasi, resetTrasitionForm, resetActiveAlert, updateActiveAlert } = formLoginRegiterSlice.actions
export default formLoginRegiterSlice.reducer;