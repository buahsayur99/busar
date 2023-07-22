import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InputProps } from "../../features/formLoginRegister/Login";

type LoginUsers = {
    email: string;
    role: string;
    uuid: string;
}

type InitialStateProps = {
    isLoading: boolean;
    isError: any;
    isMessage: string;
    dataLoginUsers: LoginUsers | null
}

const initialState: InitialStateProps = {
    isLoading: false,
    isError: null,
    isMessage: "",
    dataLoginUsers: null
}

export const postToApi = createAsyncThunk("api/postToApi", async ({ data, link }: { data: InputProps; link: string }, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data })
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData
        } else {
            // Jika respons tidak berhasil, lemparkan galat dengan pesan respons dari server
            const errorResponseData = await response.json();
            return rejectWithValue(errorResponseData)
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
});

const apiUsersSlice = createSlice({
    name: "Api's Users",
    initialState,
    reducers: {
        resetIsMessage: (state) => {
            state.isMessage = ""
        },
        logoutUsers: (state) => {
            state.dataLoginUsers = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postToApi.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isMessage = ""
            })
            .addCase(postToApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.dataLoginUsers = action.payload
                state.isMessage = action.payload.message
            })
            .addCase(postToApi.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
                state.isMessage = (action.payload as any).message
            })
    }
});

export const { resetIsMessage } = apiUsersSlice.actions;
export default apiUsersSlice.reducer;