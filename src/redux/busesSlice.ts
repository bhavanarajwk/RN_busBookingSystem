import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosConfig";

interface Bus {
  id: number;
  from: string;
  to: string;
  price: number;
  departureTime: string;
  availableSeats: number;
}

interface BusState {
  buses: Bus[];
  loading: boolean;
  error: string | null;
}

const initialState: BusState = {
  buses: [],
  loading: false,
  error: null,
};

export const fetchBuses = createAsyncThunk(
  "buses/fetchBuses",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/api/buses");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Failed to fetch buses");
    }
  }
);

const busesSlice = createSlice({
  name: "buses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.loading = false;
        state.buses = action.payload;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default busesSlice.reducer;
