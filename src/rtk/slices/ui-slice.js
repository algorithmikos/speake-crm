import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UISlice",
  initialState: { theme: "light", page404: 0 },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setPage404: (state, action) => {
      state.page404 = action.payload;
    },
  },
});

export const { setTheme, setPage404 } = UISlice.actions;
export default UISlice.reducer;
