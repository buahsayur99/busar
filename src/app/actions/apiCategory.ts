import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type DataCategoryProps = {
    id: number,
    name: string,
}

type InitialStateProps = {
    isLoadingCategory: boolean;
    isMessageCategory: string;
    dataCategory: DataCategoryProps[];
}

type ParameterProps = {
    data: DataCategoryProps;
    link: string
}

const initialState: InitialStateProps = {
    isLoadingCategory: false,
    isMessageCategory: "",
    dataCategory: []
}

export const getCategory = createAsyncThunk("get category", async (link: string, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
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

export const createCategory = createAsyncThunk("create category", async ({ data, link }: ParameterProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        });
        const responseData = response.json();

        if (response.ok) {
            return responseData;
        } else {
            return rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const removeCategory = createAsyncThunk("remove category", async ({ data, link }: ParameterProps, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        });
        const responseData = response.json();

        if (response.ok) {
            return responseData;
        } else {
            return rejectWithValue(responseData);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
})

const apiCategory = createSlice({
    name: "api category",
    initialState,
    reducers: {
        resetIsMessageCategory: (state) => {
            state.isMessageCategory = ""
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getCategory.fulfilled, (state, action) => {
                state.dataCategory = action.payload
            })

            .addCase(createCategory.pending, (state) => {
                state.isLoadingCategory = true
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoadingCategory = false
                state.isMessageCategory = action.payload.message
            })
            .addCase(createCategory.rejected, (state, action: any) => {
                state.isLoadingCategory = false
                state.isMessageCategory = action.payload.message
            })

            .addCase(removeCategory.pending, (state) => {
                state.isLoadingCategory = true
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.isLoadingCategory = false;
                state.isMessageCategory = action.payload.message;
            })
            .addCase(removeCategory.rejected, (state, action: any) => {
                state.isLoadingCategory = false
                state.isMessageCategory = action.payload.message
            })
    },
})


export default apiCategory.reducer;