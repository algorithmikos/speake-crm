import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiServer } from "../../server";

export const fetchParents = createAsyncThunk(
  "studentsSlice/fetchParents",
  async () => {
    try {
      const res = await axios.get(`${ApiServer}/parents`);
      return res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);

const parentsSlice = createSlice({
  initialState: [],
  name: "parentsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchParents.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// eslint-disable-next-line
export const {} = parentsSlice.actions;
export default parentsSlice.reducer;
