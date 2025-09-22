import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const login = createAsyncThunk("auth/login", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return response.json();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.error("Login error:", action.error);
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
