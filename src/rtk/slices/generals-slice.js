import { createSlice } from "@reduxjs/toolkit";

const generalsSlice = createSlice({
  name: "generalsSlice",
  initialState: { selectedSession: {} },
  reducers: {
    setSelectedSession: (state, action) => {
      state.selectedSession = action.payload;
    },
  },
});

export const { setSelectedSession } = generalsSlice.actions;
export default generalsSlice.reducer;
