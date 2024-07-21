import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { User, Doctor, Token, Info } from "./interfaces";
import initialState from "./initialStates";
import {doctorReducer} from "./Slices/doctorSlice";
import { userReducer } from "./Slices/userSlice";
import { tokenReducer } from "./Slices/tokenSlice";

const rootReducer  = combineReducers({
  user: userReducer,
  doctor: doctorReducer,
  token: tokenReducer,
  info: (state: Info = initialState.info) => state,
  backend: (state = initialState.backend) => state,
});

const store = configureStore({
  reducer: rootReducer,
});
export type { User, Doctor };
export default store;
export { initialState };
