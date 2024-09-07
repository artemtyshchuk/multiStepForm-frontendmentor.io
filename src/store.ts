import { configureStore } from "@reduxjs/toolkit";
import { activeStepReducer } from "./redux/activeStep-slice";
import { formReducer } from "./redux/forms-slice";

export const store = configureStore({
  reducer: {
    activeStep: activeStepReducer,
    setPersonalData: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
