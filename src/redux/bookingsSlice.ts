import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosConfig";

interface BookingState {
  bookings: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (userId: string, thunkAPI) => {
    try {
      const response = await API.get(`/api/users/${userId}`);

      // 🔥 FIX: backend returns upcomingBookings
      return response.data.upcomingBookings || [];
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Failed to fetch bookings");
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingsSlice.reducer;
