import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../interfaces";
import initialState from "../initialStates";

const userSlice = createSlice({
  name: "user",
  initialState: initialState.user as User,
  reducers: {
    addUserProfiledetails(state, action: PayloadAction<Partial<User>>) {
      const payloadKeys = Object.keys(action.payload) as Array<keyof User>;
      payloadKeys.forEach((key) => {
        if (key in state) {
          (state[key] as any) = action.payload[key]!;
        }
      });
    },
   
    resetUserState() {
      return initialState.user;
    },
  },
});

export const { actions: { addUserProfiledetails, resetUserState }, reducer: userReducer } = userSlice;
