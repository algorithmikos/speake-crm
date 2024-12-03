import { createSlice } from "@reduxjs/toolkit";

const studentsSlice = createSlice({
  initialState: {
    students: [],
    areStudentsLoading: true,
    editStudent: {},
    oldStudent: {},
    selectedStudents: [],
    purchase: {},
  },
  name: "studentsSlice",
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },

    setSelectedStudents: (state, action) => {
      state.selectedStudents = action.payload;
    },

    setAreStudentsLoading: (state, action) => {
      state.areStudentsLoading = action.payload;
    },

    setEditStudent: (state, action) => {
      if (Object.keys(state.oldStudent).length === 0) {
        state.oldStudent = action.payload;
      }
      state.editStudent = action.payload;
    },

    setOldStudent: (state, action) => {
      state.oldStudent = action.payload;
    },

    setPurchase: (state, action) => {
      state.purchase = action.payload;
    },
  },
});

export const {
  setStudents,
  setSelectedStudents,
  setAreStudentsLoading,
  setEditStudent,
  setOldStudent,
  setPurchase,
} = studentsSlice.actions;
export default studentsSlice.reducer;
