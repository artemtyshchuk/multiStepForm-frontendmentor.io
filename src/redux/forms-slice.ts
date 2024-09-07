import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonalInfoTypes, SelectPlanTypes } from "types/types";

type FormState = {
  personalInfo: PersonalInfoTypes;
  selectedPlan: SelectPlanTypes;
};

const initialState: FormState = {
  personalInfo: {
    name: "",
    email: "",
    phone: null,
  },
  selectedPlan: {
    plan: "Arcade",
    billing: "Monthly",
  },
};

const formSlice = createSlice({
  name: "@@forms",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfoTypes>) => {
      state.personalInfo = action.payload;
    },
    setSelectedPlan: (state, action: PayloadAction<SelectPlanTypes>) => {
      state.selectedPlan = action.payload;
    },
  },
});

export const { setPersonalInfo, setSelectedPlan } = formSlice.actions;
export const formReducer = formSlice.reducer;
