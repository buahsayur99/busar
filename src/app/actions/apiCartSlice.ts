import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type apiParameterProps = {
    data: {
        idProduct?: number,
        amount: number,
        urlImage: string,
        price: number,
    },
    link: string
}

const initialState = {
    dataCart: [],
    isLoadingCart: false,
    isMessageCart: "",
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
        const responseData = response.json();

        if (response.ok) return responseData;
        return rejectWithValue(responseData)
    } catch (error: any) {
        throw new Error(error.message);
    }
});

const apiCartSlice = createSlice({
    name: 'api cart',
    initialState,
    reducers: {
        resetIsMessageCart: (state) => {
            state.isMessageCart = ""
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
    }
})

export const { resetIsMessageCart } = apiCartSlice.actions;
export default apiCartSlice.reducer;