import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiServer } from "../../server";

export const fetchAssignments = createAsyncThunk(
  "sessionsSlice/fetchAssignments",
  async () => {
    try {
      const res = await axios.get(`${ApiServer}/assignments`);
      return res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);

const assignmentsSlice = createSlice({
  initialState: [],
  name: "assignmentsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAssignments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// eslint-disable-next-line
export const {} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
