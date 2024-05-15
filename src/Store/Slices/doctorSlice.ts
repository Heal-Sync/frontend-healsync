import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Doctor } from "../interfaces";
import initialState from "../initialStates";


const doctorSlice = createSlice({
  name: "doctor",
  initialState: initialState.doctor as Doctor,
  reducers: {
    addDoctorProfiledetails(state, action: PayloadAction<Partial<Doctor>>) {
      const payloadKeys = Object.keys(action.payload) as Array<keyof Doctor>;
      payloadKeys.forEach((key) => {
        if (key in state) {
          (state[key] as any) = action.payload[key]!;
        }
      });
    },
    addDoctorAccountdetails(state, action: PayloadAction<Partial<Doctor>>) {
      const payloadKeys = Object.keys(action.payload) as Array<keyof Doctor>;
      payloadKeys.forEach((key) => {
        if (key in state) {
          (state[key] as any) = action.payload[key]!;
        }
      });
    },
    addDoctorEducationdetails(state, action: PayloadAction<Partial<Doctor>>) {
      const payloadKeys = Object.keys(action.payload) as Array<keyof Doctor>;
      payloadKeys.forEach((key) => {
        if (key in state) {
          (state[key] as any) = action.payload[key]!;
        }
      });
    },
    addDoctorCategorydetails(state, action: PayloadAction<string>) {
      const payloadKeys = Object.keys(action.payload) as Array<keyof Doctor>;
      payloadKeys.forEach((key) => {
        if (key in state) {
          (state[key] as any) = action.payload[key]!;
        }
      });
    },
    addDoctorLocationdetails(state, action: PayloadAction<string>) {
      const payloadKeys = Object.keys(action.payload) as Array<keyof Doctor>;
      payloadKeys.forEach((key) => {
        if (key in state) {
          (state[key] as any) = action.payload[key]!;
        }
      });
    },
    resetDoctorState() {
      // state = initialState.doctor as Doctor;
      return initialState.doctor;
    },
  },
});

export const { actions: {addDoctorProfiledetails, addDoctorAccountdetails, addDoctorEducationdetails, addDoctorCategorydetails,
  addDoctorLocationdetails,resetDoctorState
}, reducer: doctorReducer } = doctorSlice;

