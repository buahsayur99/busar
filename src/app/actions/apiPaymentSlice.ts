import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type PaymentBankProps = {
    payment_type: string,
    payment_va_numbers: {
        bank: string,
        bill_key?: string,
        biller_code?: string,
        va_number?: string,
    }
}

export type PaymentStoreProps = {
    payment_type: string,
    payment_va_numbers: {
        payment_store: string,
        merchant_id?: string,
        payment_code: string
    }
}

export type DataPaymentProps = {
    transaction_id: string,
    status: string,
    total_price: number,
    uuid_users: string,
    customer_details: string,
    item_details: any,
    snap_token: string,
    date: number,
    expiration_time: number,
    settlement_time: string,
    status_purchase: string,
    data_payment: PaymentBankProps | PaymentStoreProps
}

type initialStateProps = {
    isLoadingPayment: boolean,
    isErrorPayment: string,
    isMessagePayment: string,
    dataPaymentAll: DataPaymentProps[] | [],
    dataPayment: DataPaymentProps | null
}

const initialState: initialStateProps = {
    isLoadingPayment: false,
    isErrorPayment: "",
    isMessagePayment: "",
    dataPaymentAll: [],
    dataPayment: null
}

export const handleGetPayment = createAsyncThunk("api/getPayment", async ({ link }: { link: string }, { rejectWithValue }) => {
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

export const handleGetPaymentByTransactionId = createAsyncThunk("api/getPaymentByTransactionId", async ({ link }: { link: string }, { rejectWithValue }) => {
    const response = await fetch(link, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });
    const responseData = await response.json();

    if (response.ok) {
        return responseData;
    } else {
        return rejectWithValue(responseData);
    }
})

const apiPaymentSlice = createSlice({
    name: "api payment",
    initialState,
    reducers: {
        resetIsMessagePayment: (state) => {
            state.isMessagePayment = ""
        },
    },
    extraReducers(builder) {
        builder
            .addCase(handleGetPayment.pending, (state) => {
                state.isLoadingPayment = true
            })
            .addCase(handleGetPayment.fulfilled, (state, action) => {
                state.isLoadingPayment = false
                state.dataPaymentAll = action.payload
            })
            .addCase(handleGetPayment.rejected, (state, action: any) => {
                state.isLoadingPayment = false
                state.isMessagePayment = action.payload.message
            })

            .addCase(handleGetPaymentByTransactionId.pending, (state) => {
                state.isLoadingPayment = true
            })
            .addCase(handleGetPaymentByTransactionId.fulfilled, (state, action) => {
                state.isLoadingPayment = false
                state.dataPayment = action.payload
            })
            .addCase(handleGetPaymentByTransactionId.rejected, (state, action: any) => {
                state.isLoadingPayment = false
                state.isMessagePayment = action.payload.message
            })
    },
});


export const { resetIsMessagePayment } = apiPaymentSlice.actions
export default apiPaymentSlice.reducer;