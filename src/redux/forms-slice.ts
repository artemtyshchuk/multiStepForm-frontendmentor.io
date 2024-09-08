import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddOnsTypes, PersonalInfoTypes, SelectPlanTypes } from "types/types";

type FormState = {
  personalInfo: PersonalInfoTypes;
  selectedPlan: SelectPlanTypes;
  addOns: AddOnsTypes;
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
  addOns: {
    addOnsTitles: [],
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
    setAddOns: (state, payload: PayloadAction<AddOnsTypes>) => {
      state.addOns.addOnsTitles = payload.payload.addOnsTitles;
    },
  },
});

export const { setPersonalInfo, setSelectedPlan, setAddOns } =
  formSlice.actions;
export const formReducer = formSlice.reducer;
