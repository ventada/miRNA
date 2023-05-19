import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  userRank: "",
  userScore: 0,
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
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
