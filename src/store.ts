import { configureStore } from "@reduxjs/toolkit";
import { activeStepReducer } from "./redux/activeStep-slice";

export const store = configureStore({
  reducer: {
    activeStep: activeStepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
