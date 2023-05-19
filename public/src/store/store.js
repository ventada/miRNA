import { configureStore } from "@reduxjs/toolkit";

import sequenceSlice from "./logic/sequenceSlice";
import userSlice from "./logic/userSlice";
import motifsSlice from "./logic/motifsSlice";

const store = configureStore({
  reducer: {
    sequence: sequenceSlice,
    user: userSlice,
    motif: motifsSlice,
  },
});

export default store;
