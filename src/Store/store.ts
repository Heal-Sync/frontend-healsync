import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { User, Doctor, Token, Info } from "./interfaces";
import initialState from "./initialStates";
import {doctorReducer} from "./Slices/doctorSlice";

const rootReducer  = combineReducers({
  user: (state: User = initialState.user) => state,
  doctor: doctorReducer,
  token: (state: Token = initialState.token) => state,
  info: (state: Info = initialState.info) => state,
  backend: (state = initialState.backend) => state,
});

const store = configureStore({
  reducer: rootReducer,
});
export type { User, Doctor };
export default store;
export { initialState };
