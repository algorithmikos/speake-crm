import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    users: [],
    areUsersLoading: true,
    isArchiveIncluded: false,

    selectedUsers: [],

    editUser: {},
    compareUser: {},
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setAreUsersLoading: (state, action) => {
      state.areUsersLoading = action.payload;
    },

    setIsArchiveIncluded: (state, action) => {
      state.isArchiveIncluded = action.payload;
    },

    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },

    setEditUser: (state, action) => {
      state.editUser = action.payload;
    },

    setCompareUser: (state, action) => {
      state.compareUser = action.payload;
    },
  },
});

export const {
  setUsers,
  setAreUsersLoading,
  setIsArchiveIncluded,
  setSelectedUsers,
  setEditUser,
  setCompareUser,
} = usersSlice.actions;
export default usersSlice.reducer;
