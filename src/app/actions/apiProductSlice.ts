import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type productProps = {
    id?: number;
    name: string;
    image: string;
    information: string;
    amount: number;
    url: string;
    price: number;
    category?: number;
}

type InitialStateProps = {
    isLoadingProduct: boolean;
    isMessageProduct: string;
    dataProductApi: productProps[];
    validasiProduct: Record<string, { status: boolean, text: string, tipe?: "" }>
}

type ProductsApi = {
    formData: FormData;
    link: string;
}


const initialState: InitialStateProps = {
    isLoadingProduct: false,
    isMessageProduct: "",
    dataProductApi: [],
    validasiProduct: {
        name: { status: false, text: "" },
        amount: { status: false, text: "" },
        price: { status: false, text: "" },
        category: { status: false, text: "" },
        information: { status: false, text: "" },
        image1: { status: false, text: "" },
        image2: { status: false, text: "" },
        image3: { status: false, text: "" },
        image4: { status: false, text: "" },
        image5: { status: false, text: "" },
    }
}

export const createProductsApi = createAsyncThunk("api/createProducts", async ({ formData, link }: ProductsApi, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "POST",
            body: formData
        });
        const responseData = await response.json();

        if (response.ok) {
            return responseData
        } else {
            return rejectWithValue(responseData)
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const updateProductApi = createAsyncThunk("api/updateProduct", async ({ formData, link }: ProductsApi, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "PATCH",
            body: formData
        });
        const responseData = response.json();

        if (response.ok) return responseData;
        return rejectWithValue(responseData);
    } catch (error: any) {
        throw new Error(error.message);
    }
})

export const getProduct = createAsyncThunk("get product api", async (link: string, { rejectWithValue }) => {
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

export const removeProduct = createAsyncThunk("delete/product", async ({ link, arrayId }: { link: string, arrayId: number[] }, { rejectWithValue }) => {
    try {
        const response = await fetch(link, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ arrayId })
        });
        const responseData = await response.json();

        if (responseData.ok) {
            return responseData
        } else {
            return rejectWithValue(responseData);
        }

    } catch (error: any) {
        throw new Error(error.message);
    }
})

const apiProductSlice = createSlice({
    name: "api product",
    initialState,
    reducers: {
        updateValidasiProduct: (state, action) => {
            state.validasiProduct = { ...state.validasiProduct, ...action.payload }
        },
        resetValidasiProduct: (state) => {
            state.validasiProduct = {
                name: { status: false, text: "" },
                amount: { status: false, text: "" },
                price: { status: false, text: "" },
                category: { status: false, text: "" },
                image: { status: false, text: "", tipe: "" },
            }
        },
        resetIsMessageProduct: (state) => {
            state.isMessageProduct = ""
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.dataProductApi = action.payload
            })

            .addCase(createProductsApi.pending, (state) => {
                state.isLoadingProduct = true;
            })
            .addCase(createProductsApi.fulfilled, (state, action) => {
                state.isLoadingProduct = false;
                state.isMessageProduct = action.payload.message;
            })
            .addCase(createProductsApi.rejected, (state, action: any) => {
                state.isLoadingProduct = false;
                state.isMessageProduct = action.payload.message;
            })

            .addCase(removeProduct.pending, (state) => {
                state.isLoadingProduct = true;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.isLoadingProduct = false;
                state.isMessageProduct = action.payload.message;
            })
            .addCase(removeProduct.rejected, (state, action: any) => {
                state.isLoadingProduct = false;
                state.isMessageProduct = action.payload.message;
            })

            .addCase(updateProductApi.pending, (state) => {
                state.isLoadingProduct = true
            })
            .addCase(updateProductApi.fulfilled, (state, action) => {
                state.isLoadingProduct = false
                state.isMessageProduct = action.payload.message
            })
            .addCase(updateProductApi.rejected, (state, action: any) => {
                state.isLoadingProduct = false
                state.isMessageProduct = action.payload.message
            })
    },
});

export const { updateValidasiProduct, resetValidasiProduct, resetIsMessageProduct } = apiProductSlice.actions
export default apiProductSlice.reducer
