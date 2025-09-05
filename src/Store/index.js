import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { TBSlice } from "./Reducers/TBSlice";

const main = combineReducers({
  TB: TBSlice.reducer,
});

export default configureStore({
  reducer: {
    main: main,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
