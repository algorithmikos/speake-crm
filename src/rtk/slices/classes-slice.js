import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiServer } from "../../server";
import { generateUID } from "../../utils/functions";

export const fetchClasses = createAsyncThunk(
  "sessionsSlice/fetchClasses",
  async () => {
    try {
      // const res = await axios.get(`${ApiServer}/classes`);
      // return res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);

const classesSlice = createSlice({
  initialState: {
    classes: [],

    newClass: {
      days: [],
      startTime: "",
      endTime: "",
      place: "n/a",
    },

    newClassTemp: {
      days: [],
      startTime: "",
      endTime: "",
      place: "n/a",
    },
  },
  name: "classesSlice",
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },

    setNewClass: (state, action) => {
      state.newClass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClasses.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// eslint-disable-next-line
export const { setClasses, setNewClass } = classesSlice.actions;
export default classesSlice.reducer;
