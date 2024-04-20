import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InputProps } from "../../features/formLoginRegister/Login";

export type LoginUsers = {
    email: string;
    role: string;
    uuid: string;
    idAddress: number;
}

export type MessageProps = {
    message: string;
}

type ApiParameterProps = {
    data?: InputProps;
    link: string;
}

type settingProfileProps = {
    uuid?: string;
    email?: string;
}

type ApiSettingProfileProps = {
    data?: settingProfileProps;
    link: string;
}

export type DataUsersAllProps = {
    id: number;
    email: string;
    idAddress: number;
    role: string;
}

type InitialStateProps = {
    isLoading: boolean;
    isLoadingAuth: boolean | null;
    isError: any;
    isMessage: string | null;
    dataLoginUsers: LoginUsers | null;
    dataUsersAll: DataUsersAllProps[];
    isUuid: string | null
}

const initialState: InitialStateProps = {
    isLoading: false,
    isLoadingAuth: null,
    isError: null,
    isMessage: "",
    dataLoginUsers: null,
    dataUsersAll: [],
    isUuid: null
}
export const authLogin = createAsyncThunk("api/getMe", async ({ link }: ApiSettingProfileProps, { rejectWithValue }) => {
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
            return rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const getUsers = createAsyncThunk("api/getUsers", async ({ link }: ApiSettingProfileProps, { rejectWithValue }) => {
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
            return rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const getUsersAll = createAsyncThunk("api/getUsersAll", async ({ link }: ApiSettingProfileProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const responseData = response.json();

        if (response.ok) return responseData;
        return rejectWithValue(responseData);
    } catch (error: any) {
        throw new Error(error.message);
    }
})

export const updateSettingProfile = createAsyncThunk("api/updateSettingProfile", async ({ data, link }: ApiSettingProfileProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data })
        });
        const responseData = response.json();

        if (response.ok) {
            return responseData
        } else {
            return rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
});

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
        const responseData = await response.json();

        console.log(responseData)

        if (response.ok) {
            return responseData
        } else {
            // Jika respons tidak berhasil, lemparkan galat dengan pesan respons dari server
            return rejectWithValue(responseData)
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
});

export const addAddressUtama = createAsyncThunk("api/addAddressUtama", async ({ data, link }: { data: { idAddress: (number | undefined) }; link: string }, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        });
        const responseData = response.json();
        if (response.ok) {
            return responseData
        } else {
            return rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error(error.message);

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
        },
        resetDataLoginUsers: (state) => {
            state.dataLoginUsers = null
        },
        resetDataUsersAll: (state) => {
            state.dataUsersAll = []
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

            // getUsers
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isMessage = null
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isMessage = null;
                state.dataLoginUsers = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
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

            // updateUsersByUuid
            .addCase(updateSettingProfile.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
                state.isMessage = null
            })
            .addCase(updateSettingProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isMessage = action.payload.message
            })
            .addCase(updateSettingProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.error

                const payload = action.payload as MessageProps;
                if (payload?.message !== undefined) {
                    state.isMessage = payload.message;
                } else {
                    state.isMessage = "Terjadi kesalahan saat memproses permintaan.";
                }
            })

            // getUsers
            .addCase(authLogin.pending, (state) => {
                state.isLoadingAuth = true
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.dataLoginUsers = action.payload
            })
            .addCase(authLogin.rejected, (state) => {
                state.isLoadingAuth = false
            })

            // Update Address Utama
            .addCase(addAddressUtama.fulfilled, (state, action) => {
                state.isMessage = action.payload.message
            })
    }
});

export const { resetIsMessage, resetUuid, resetDataLoginUsers, logoutUsers, resetDataUsersAll } = apiUsersSlice.actions;
export default apiUsersSlice.reducer;