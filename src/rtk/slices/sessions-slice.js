import { createSlice } from "@reduxjs/toolkit";

const sessionsSlice = createSlice({
  name: "sessionsSlice",
  initialState: {
    sessions: [],
    areSessionsLoading: true,
    isArchiveIncluded: false,

    selectedSessions: [],

    newSession: {},

    editSession: {},
    compareSession: {},
  },
  reducers: {
    setSessions: (state, action) => {
      state.sessions = action.payload;
    },

    setAreSessionsLoading: (state, action) => {
      state.areSessionsLoading = action.payload;
    },

    setIsArchiveIncluded: (state, action) => {
      state.isArchiveIncluded = action.payload;
    },

    setSelectedSessions: (state, action) => {
      state.selectedSessions = action.payload;
    },

    setNewSession: (state, action) => {
      state.newSession = action.payload;
    },

    setEditSession: (state, action) => {
      state.editSession = action.payload;
    },

    setCompareSession: (state, action) => {
      state.compareSession = action.payload;
    },
  },
});

export const {
  setSessions,
  setAreSessionsLoading,
  setIsArchiveIncluded,
  setSelectedSessions,
  setNewSession,
  setEditSession,
  setCompareSession,
} = sessionsSlice.actions;
export default sessionsSlice.reducer;
