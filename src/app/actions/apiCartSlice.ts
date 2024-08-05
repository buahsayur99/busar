import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productProps } from "./apiProductSlice";

type apiParameterProps = {
    data: productProps | DataCartProps;
    link: string
}

export type DataCartProps = {
    id: number,
    idProduct: number,
    nameProduct: string,
    amount: number,
    price: number,
    totalPrice: number,
    urlImage: string,
    uuidUser: string
}

type InitialStateProps = {
    dataCart: DataCartProps[],
    dataCartBasket: DataCartProps[],
    isLoadingCart: boolean,
    isMessageCart: string | null,
    activeCart: boolean,
    checkedCart: DataCartProps[]
}

const initialState: InitialStateProps = {
    dataCart: [],
    dataCartBasket: [],
    isLoadingCart: true,
    isMessageCart: "",
    activeCart: false,
    checkedCart: []
}

export const getCart = createAsyncThunk("api/getCart", async (link: string, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const responseData = response.json();

        if (response.ok) return responseData
        return rejectWithValue(responseData);
    } catch (error: any) {
        throw new Error(error.message);
    }
})

export const addCart = createAsyncThunk("api/addCart", async ({ data, link }: apiParameterProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        });
        const responseData = await response.json();

        if (response.ok) return responseData;
        return rejectWithValue(responseData)
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const updateCart = createAsyncThunk("api/updateCart", async ({ data, link }: apiParameterProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        });
        const responseData = response.json();

        if (response.ok) return responseData;
        return rejectWithValue(responseData);
    } catch (error: any) {
        throw new Error(error.message);
    }
})

export const deleteCart = createAsyncThunk("api/deleteCart", async ({ data, link }: { data: { arrayId: number[] }, link: string }, { rejectWithValue }) => {
    const response = await fetch(link, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data })
    })
    const responseData = await response.json();

    if (response.ok) return responseData
    return rejectWithValue(responseData)
})

const apiCartSlice = createSlice({
    name: 'api cart',
    initialState,
    reducers: {
        resetIsMessageCart: (state) => {
            state.isMessageCart = null
        },
        activeCarts: (state, action) => {
            state.activeCart = action.payload
        },
        handleCheckedCart: (state, action) => {
            if (action.payload === "selectAll") {
                if (state.checkedCart.length !== state.dataCart.length) {
                    state.checkedCart = state.dataCart
                } else {
                    state.checkedCart = []
                }
            } else {
                const dataChecked = state.checkedCart.filter((data) => {
                    return data.id === action.payload.id
                });

                if (dataChecked.length !== 0) {
                    const NewDataChecked = state.checkedCart.filter((data) => {
                        return data.id !== action.payload.id
                    });

                    state.checkedCart = NewDataChecked
                } else {
                    state.checkedCart = [...state.checkedCart, action.payload]
                }
            }
        },
        updateCheckedCart: (state, action) => {
            state.checkedCart = action.payload
        },
        handleResetData: (state) => {
            state.dataCart = []
        },
        updateCartsData: (state, action) => {
            state.dataCart = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.isLoadingCart = true
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoadingCart = false
                state.dataCart = action.payload
                state.dataCartBasket = action.payload
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoadingCart = false
            })

            .addCase(addCart.pending, (state) => {
                state.isLoadingCart = true
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.isLoadingCart = false
                state.isMessageCart = action.payload.message
            })
            .addCase(addCart.rejected, (state, action: any) => {
                state.isLoadingCart = false
                state.isMessageCart = action.payload.message
            })

            .addCase(updateCart.pending, (state) => {
                state.isLoadingCart = true
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.isLoadingCart = false
                state.isMessageCart = action.payload.message
            })
            .addCase(updateCart.rejected, (state, action: any) => {
                state.isLoadingCart = false
                state.isMessageCart = action.payload.message
            })

            .addCase(deleteCart.pending, (state) => {
                state.isLoadingCart = true
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoadingCart = false
                state.isMessageCart = action.payload.message
            })
            .addCase(deleteCart.rejected, (state, action: any) => {
                state.isLoadingCart = false
                state.isMessageCart = action.payload.message
            })
    }
})

export const { resetIsMessageCart, activeCarts, handleCheckedCart, updateCheckedCart, handleResetData, updateCartsData } = apiCartSlice.actions;
export default apiCartSlice.reducer;