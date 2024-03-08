import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MessageProps } from "./apiUsersSlice";
import { dataInputFormAddress } from "../../data/FormAddress";

export type DataAddressProps = {
    id?: number;
    name: string;
    numberPhone: string;
    addressLabel: string;
    city: string;
    subdistrict: string;
    codePos: string;
    completeAddress: string;
    courierNote: string | null;
    uuidUser?: string | null;
    main?: boolean | null;
    choice?: boolean | null;
}

type MainAddressUpdateDataProps = {
    mainAddress: { id: number },
    address: { id: number }
}

type ApiSettingProfileProps = {
    data?: DataAddressProps | MainAddressUpdateDataProps | number[];
    link: string;
}

type AddressLabelProps = {
    id: number;
    name: string;
}

type InitialStateProps = {
    isLoading: boolean;
    isGetLoading: boolean;
    isMessageAddress: string | null;
    dataAddress: DataAddressProps[];
    dataAddressLabel: AddressLabelProps[];
    checkeds: DataAddressProps[];
    inputFormAddress: DataAddressProps;
}

const initialState: InitialStateProps = {
    isLoading: false,
    isGetLoading: false,
    isMessageAddress: null,
    inputFormAddress: dataInputFormAddress,
    dataAddress: [],
    dataAddressLabel: [],
    checkeds: [],
}

export const getAddress = createAsyncThunk("api/getAddress", async ({ link }: ApiSettingProfileProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const responseData = response.json();

        if (response.ok) {
            return responseData;
        } else {
            return rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
})

export const getAddressLabel = createAsyncThunk("api/getAddressLabel", async ({ link }: ApiSettingProfileProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const responseData = response.json();

        if (response.ok) {
            return responseData
        } else {
            return rejectWithValue(responseData)
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
})

export const createAddress = createAsyncThunk("api/createAddress", async ({ data, link }: ApiSettingProfileProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data })
        });
        const responseData = await response.json()
        if (response.ok) {
            return responseData
        } else {
            return rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
})

export const removeAddress = createAsyncThunk("api/removeAddress", async ({ data, link }: { data: { id: (number | undefined)[] }; link: string }, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
        const dataResponse = await response.json()
        if (response.ok) {
            return dataResponse
        } else {
            return rejectWithValue(dataResponse);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
})

export const updateAddress = createAsyncThunk("api/updateAddress", async ({ data, link }: ApiSettingProfileProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        });
        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
})

export const updateMainAddress = createAsyncThunk("api/updateMainAddress", async ({ data, link }: ApiSettingProfileProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
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
})

export const updateChoiceAddress = createAsyncThunk("api/updateChoiceAddress", async ({ data, link }: { data: { choiceAddress: { id: number }, address: { id: number } }; link: string }, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
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
})

const apiAddressSlice = createSlice({
    name: "api address",
    initialState,
    reducers: {
        resetIsMessageAddress: (state) => {
            state.isMessageAddress = null
        },
        handleOnCheckboxAddress: (state, action) => {
            const data = state.checkeds
            const input = action.payload

            let newCheckeds = [...state.checkeds]

            if (input.selectAll === true) {
                if (data.length !== state.dataAddress.length - 1) {
                    const address = state.dataAddress;
                    const filterAddress = address.filter((address) => {
                        return address.id !== input.idAddress
                    })

                    newCheckeds = filterAddress
                } else {
                    newCheckeds = []
                }
            } else {
                const matchingData = data.filter((data) => {
                    return data.id === input.id
                })

                if (matchingData.length === 0) {
                    newCheckeds.push(input)
                } else {
                    newCheckeds = newCheckeds.filter((data) => {
                        return data.id !== input.id
                    })
                }
            }

            state.checkeds = newCheckeds
        },
        resetCheckeds: (state) => {
            state.checkeds = []
        },
        changeInputAddress: (state, action) => {
            state.inputFormAddress = { ...state.inputFormAddress, ...action.payload }
        },
        resetInputAddress: (state) => {
            state.inputFormAddress = dataInputFormAddress
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.isMessageAddress = action.payload.message
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.isLoading = false

                const payload = action.payload as MessageProps;
                if (payload?.message !== undefined) {
                    state.isMessageAddress = payload.message
                } else {
                    state.isMessageAddress = "Terjadi kesalahan saat memproses permintaan."
                }
            })

            .addCase(getAddress.pending, (state) => {
                state.isGetLoading = true
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.isGetLoading = false
                state.dataAddress = action.payload
                state.checkeds = []
            })
            .addCase(getAddress.rejected, (state, action) => {
                state.isGetLoading = false
            })

            .addCase(getAddressLabel.pending, (state) => {
                state.isGetLoading = true
            })
            .addCase(getAddressLabel.fulfilled, (state, action) => {
                state.isGetLoading = false
                state.dataAddressLabel = action.payload
            })
            .addCase(getAddressLabel.rejected, (state, action: any) => {
                state.isGetLoading = false
                state.isMessageAddress = action.payload.message
            })

            .addCase(removeAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.isMessageAddress = action.payload.message
            })
            .addCase(removeAddress.rejected, (state, action) => {
                state.isLoading = false

                const payload = action.payload as MessageProps
                if (payload.message !== undefined) {
                    state.isMessageAddress = payload.message
                } else {
                    state.isMessageAddress = "Terjadi kesalahan saat memproses permintaan."
                }
            })

            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.inputFormAddress = dataInputFormAddress
                state.isMessageAddress = action.payload.message
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.isLoading = false
            })

            .addCase(updateMainAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateMainAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.isMessageAddress = action.payload.message
            })
            .addCase(updateMainAddress.rejected, (state, action: any) => {
                state.isLoading = false
                state.isMessageAddress = action.payload.message
            })

            .addCase(updateChoiceAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateChoiceAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.isMessageAddress = action.payload.message
            })
            .addCase(updateChoiceAddress.rejected, (state, action: any) => {
                state.isLoading = false
                state.isMessageAddress = action.payload.message
            })
    }
});

export const { resetIsMessageAddress, handleOnCheckboxAddress, resetCheckeds, changeInputAddress, resetInputAddress } = apiAddressSlice.actions;
export default apiAddressSlice.reducer