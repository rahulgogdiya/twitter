import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",

  initialState: {
    tweets: null,
    refresh: false,
    isActive:true
  },
  reducers: {
    //multiple action
    getAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsActive: (state) => {
      state.isActive = state.refresh;
    },
  },
});
export const { getAllTweets, getRefresh,getIsActive } = tweetSlice.actions;
export default tweetSlice.reducer;
