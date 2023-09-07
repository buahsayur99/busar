import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InputProps } from "../../features/formLoginRegister/Login";

type LoginUsers = {
    email: string;
    role: string;
    uuid: string;
}

type MessageProps = {
    message: string
}

type ApiParameterProps = {
    data?: InputProps;
    link: string
}

type InitialStateProps = {
    isLoading: boolean;
    isError: any;
    isMessage: string | null;
    dataLoginUsers: LoginUsers | null;
    isUuid: string | null
}

const initialState: InitialStateProps = {
    isLoading: false,
    isError: null,
    isMessage: "",
    dataLoginUsers: null,
    isUuid: null
}

export const postToApi = createAsyncThunk("api/postToApi", async ({ data, link }: ApiParameterProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
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

export const getUsersByEmail = createAsyncThunk("api/getUsersByEmail", async ({ link }: { link: string }, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const responseData = await response.json();
        if (response.ok) {
            return responseData
        } else {
            // Jika respons tidak berhasil, lemparkan galat dengan pesan respons dari server
            return rejectWithValue(responseData)
        }
    } catch (error: any) {
        throw new Error('An error occurred while processing the request.');
    }
})

export const updateUsersById = createAsyncThunk("api/updateUsersById", async ({ data, link }: ApiParameterProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data })
        });
        const responseData = await response.json()
        if (responseData.ok) {
            return responseData
        } else {
            return rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error('An error occurred while processing the request.');
    }
})

export const authUuid = createAsyncThunk("api/authUuid", async ({ link }: ApiParameterProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include', // Mengizinkan pengiriman cookies
        });

        const data = await response.json()
        console.log(data)
    } catch (error) {

    }
})

const apiUsersSlice = createSlice({
    name: "Api's Users",
    initialState,
    reducers: {
        resetIsMessage: (state) => {
            state.isMessage = ""
        },
        logoutUsers: (state) => {
            state.dataLoginUsers = null
        },
        resetUuid: (state) => {
            state.isUuid = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postToApi.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isMessage = null
            })
            .addCase(postToApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.dataLoginUsers = action.payload
                state.isMessage = action.payload.message
            })
            .addCase(postToApi.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload

                const payload = action.payload as MessageProps;
                if (payload?.message !== undefined) {
                    state.isMessage = payload.message;
                } else {
                    state.isMessage = "Terjadi kesalahan saat memproses permintaan.";
                }
            })

            // getUsersByEmail
            .addCase(getUsersByEmail.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isMessage = null
            })
            .addCase(getUsersByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isMessage = null;
                state.isUuid = action.payload
            })
            .addCase(getUsersByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;

                // Periksa apakah action.payload ada dan mengandung properti message
                const payload = action.payload as MessageProps;
                if (payload?.message !== undefined) {
                    state.isMessage = payload.message;
                } else {
                    state.isMessage = "Terjadi kesalahan saat memproses permintaan.";
                }
            })

            // updateUsersById
            .addCase(updateUsersById.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isMessage = null
            })
            .addCase(updateUsersById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isMessage = action.payload.message
            })
            .addCase(updateUsersById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.error

                const payload = action.payload as MessageProps;
                if (payload?.message !== undefined) {
                    state.isMessage = payload.message;
                } else {
                    state.isMessage = "Terjadi kesalahan saat memproses permintaan.";
                }
            })
    }
});

export const { resetIsMessage, resetUuid } = apiUsersSlice.actions;
export default apiUsersSlice.reducer;