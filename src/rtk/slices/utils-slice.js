import { createSlice } from "@reduxjs/toolkit";

const utilsSlice = createSlice({
  name: "utilsSlice",
  initialState: { replies: [], newReply: {}, editReply: {} },
  reducers: {
    setReplies: (state, action) => {
      state.replies = action.payload;
    },
    setNewReply: (state, action) => {
      state.newReply = action.payload;
    },
    setEditReply: (state, action) => {
      state.editReply = action.payload;
    },
  },
});

export const { setReplies, setNewReply, setEditReply } = utilsSlice.actions;
export default utilsSlice.reducer;
