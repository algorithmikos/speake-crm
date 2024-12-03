import { createSlice } from "@reduxjs/toolkit";

const campaignsSlice = createSlice({
  initialState: {
    campaigns: [],

    newCampaign: {},

    editCampaign: {},

    newCampaignTemp: {},
  },
  name: "campaignsSlice",
  reducers: {
    setCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },

    setNewCampaign: (state, action) => {
      state.newCampaign = action.payload;
    },

    setEditCampaign: (state, action) => {
      state.editCampaign = action.payload;
    },
  },
});

// eslint-disable-next-line
export const { setCampaigns, setNewCampaign, setEditCampaign } =
  campaignsSlice.actions;
export default campaignsSlice.reducer;
