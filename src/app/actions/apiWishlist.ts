import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ApiWishlistProps = {
    link: string,
    data?: {
        uuidUser?: string,
        idProduct?: number,
    }
}

export type DataWishlistProps = {
    id: number,
    uuidUser: string,
    idProduct: number,
}

type InitialStateProps = {
    dataWishlist: DataWishlistProps[],
    isLoadingWishlist: boolean,
    isMessageWishlist: string,
}

const initialState: InitialStateProps = {
    dataWishlist: [],
    isLoadingWishlist: false,
    isMessageWishlist: "",
}

export const getWishlist = createAsyncThunk("get api wishlist", async ({ link }: ApiWishlistProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        });
        const responseData = response.json();

        if (response.ok) return responseData
        return rejectWithValue(responseData);
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const addWishlist = createAsyncThunk("add wishlist", async ({ link, data }: ApiWishlistProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        });
        const responseData = response.json();
        if (response.ok) return responseData
        return rejectWithValue(responseData);
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const removeWishlist = createAsyncThunk("remove wishlist", async ({ link }: ApiWishlistProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        });
        const responseData = response.json();

        if (response.ok) return responseData
        return rejectWithValue(responseData)
    } catch (error: any) {
        throw new Error(error.message);
    }
})

const apiWishlist = createSlice({
    name: "handle api's wishlist",
    initialState,
    reducers: {
        resetIsMessageWishlist: (state) => {
            state.isMessageWishlist = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.isLoadingWishlist = true
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoadingWishlist = false
                state.dataWishlist = action.payload
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isLoadingWishlist = false
            })

            .addCase(addWishlist.pending, (state) => {
                state.isLoadingWishlist = true
            })
            .addCase(addWishlist.fulfilled, (state, action) => {
                state.isLoadingWishlist = false
                state.isMessageWishlist = action.payload.message
            })
            .addCase(addWishlist.rejected, (state, action: any) => {
                state.isLoadingWishlist = false
                state.isMessageWishlist = action.payload.message
            })

            .addCase(removeWishlist.pending, (state) => {
                state.isLoadingWishlist = true
            })
            .addCase(removeWishlist.fulfilled, (state, action) => {
                state.isLoadingWishlist = false
                state.isMessageWishlist = action.payload.message
            })
            .addCase(removeWishlist.rejected, (state, action: any) => {
                state.isLoadingWishlist = false
                state.isMessageWishlist = action.payload.message
            })
    }
});

export const { resetIsMessageWishlist } = apiWishlist.actions;
export default apiWishlist.reducer;
