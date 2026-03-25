import { configureStore } from "@reduxjs/toolkit";
import predioReducer from "../modules/predios/predioSlice";

const store = configureStore({
  reducer: {
    predios: predioReducer,
  },
});

export default store;