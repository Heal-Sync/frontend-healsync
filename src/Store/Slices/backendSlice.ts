import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { Backend } from "../interfaces";
import initialState from "../initialStates";

const backendSlice = createSlice({
    name: "backend",
    initialState: initialState.backend as Backend,
    reducers: {
        
    },
});

export const { reducer: backendReducer } = backendSlice;


