import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  userRank: "",
  userScore: 0,
  isScoreChanged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName(state, action) {
      state.username = action.payload;
    },
    setNewScore(state, action) {
      state.userScore = action.payload;
    },
    isScoreChanged(state, action) {
      state.isScoreChanged = !state.isScoreChanged;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
