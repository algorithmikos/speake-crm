import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState: {
    clientFilterSection: false,
    clientFilterParams: {
      leadSource: [],
      status: [],
      priority: [],
      type: [],
      nextAction: [],
      startDate: "",
      endDate: "",
      calls: "",
    },

    studentFilterSection: false,
    studentFilterParams: {},
  },
  reducers: {
    setClientFilterSection: (state, action) => {
      state.clientFilterSection = action.payload;
    },
    setClientFilterParams: (state, action) => {
      state.clientFilterParams = action.payload;
    },

    setStudentFilterSection: (state, action) => {
      state.studentFilterSection = action.payload;
    },
    setStudentFilterParams: (state, action) => {
      state.studentFilterParams = action.payload;
    },
  },
});

export const {
  setClientFilterSection,
  setClientFilterParams,

  setStudentFilterSection,
  setStudentFilterParams,
} = filtersSlice.actions;
export default filtersSlice.reducer;
