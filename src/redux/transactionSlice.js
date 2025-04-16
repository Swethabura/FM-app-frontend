import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://fm-app-backend.onrender.com/api/transactions";

// Async Thunks
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, data }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
  }
);

// Slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load";
      })

      // Add
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // Delete
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      })

      // Update
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default transactionSlice.reducer;
