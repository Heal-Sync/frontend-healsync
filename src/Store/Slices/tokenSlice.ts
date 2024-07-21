import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Token } from "../interfaces";
import initialState from "../initialStates";

interface UpdateValuePayload {
    key: keyof Token;
    value: any;
  }
const tokenSlice = createSlice({
  name: "token",
  initialState: initialState.token as Token,
  reducers: {
    updateToken(state, action: PayloadAction<UpdateValuePayload>) {
        const { key, value } = action.payload;
        if (key in state) {
          (state[key] as any) = value;
        }
      },
    resetTokenState() {
      return initialState.token;
    },
  },
});

export const { actions: { updateToken, resetTokenState }, reducer: tokenReducer } = tokenSlice;
