import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const activeStepSlice = createSlice({
  name: "@@activeStep",
  initialState: 1,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export const { setActiveStep } = activeStepSlice.actions;
export const activeStepReducer = activeStepSlice.reducer;
