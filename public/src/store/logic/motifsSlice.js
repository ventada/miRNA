import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  motif: [false],
  motifExclusionArray: [],
};

// example for motif state
let a = [
  {
    firstRow: 1,
    secondRow: 2,
    between: "13-16",
    motif: "AAA",
    score: 15,
  },
];
const motifSlice = createSlice({
  name: "motif",
  initialState,
  reducers: {
    setMotif(state, action) {
      state.motif = action.payload;
    },
    excludeMotif(state, action) {
      state.motifExclusionArray.push(action.payload);
    },
    setExcludeMotif(state, action) {
      state.motifExclusionArray = state.motifExclusionArray.concat(
        action.payload
      );
    },
    setExcludeMotifEmpty(state, action) {
      state.motifExclusionArray = state.motifExclusionArray.splice(0, a.length);
    },
  },
});

export const motifActions = motifSlice.actions;

export default motifSlice.reducer;
