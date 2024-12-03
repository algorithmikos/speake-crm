import { createSlice } from "@reduxjs/toolkit";

const clientsSlice = createSlice({
  name: "clientsSlice",
  initialState: {
    clients: [],
    areClientsLoading: true,
    isArchiveIncluded: false,

    selectedClients: [],

    newClient: {
      name: "",
      phoneNum: "",
      role: "",
      area: "",
      leadSource: "",
      status: "",
      priority: "",
      type: "",
      class: "",
      notes: "",
    },

    newClientTemp: {
      name: "",
      phoneNum: "",
      role: "",
      area: "",
      leadSource: "",
      status: "",
      priority: "",
      type: "",
      class: "",
      notes: "",
    },

    editClient: {},
    oldClient: {},
    compareClient: {},
  },
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },

    setAreClientsLoading: (state, action) => {
      state.areClientsLoading = action.payload;
    },

    setIsArchiveIncluded: (state, action) => {
      state.isArchiveIncluded = action.payload;
    },

    setSelectedClients: (state, action) => {
      state.selectedClients = action.payload;
    },

    setNewClient: (state, action) => {
      state.newClient = action.payload;
    },

    setEditClient: (state, action) => {
      if (Object.keys(state.oldClient).length === 0) {
        state.oldClient = action.payload;
      }
      state.editClient = action.payload;
    },

    setOldClient: (state, action) => {
      state.oldClient = action.payload;
    },

    setCompareClient: (state, action) => {
      state.compareClient = action.payload;
    },
  },
});

export const {
  setClients,
  setAreClientsLoading,
  setIsArchiveIncluded,
  setSelectedClients,
  setNewClient,
  setEditClient,
  setOldClient,
  setCompareClient,
} = clientsSlice.actions;
export default clientsSlice.reducer;
