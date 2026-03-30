import { configureStore } from "@reduxjs/toolkit";
import prediosReducer from "../modules/predios/predioSlice";
import authReducer from "../modules/auth/authSlice";

const store = configureStore({
  reducer: {
    predios: prediosReducer,
    auth: authReducer,
  },
});

export default store;