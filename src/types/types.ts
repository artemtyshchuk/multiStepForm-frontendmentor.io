export type StepsType = {
  id: number;
  title: string;
  subTitle: string;
};

export type PersonalInfoTypes = {
  name: string;
  email: string;
  phone: number | null;
};

export type SelectPlanTypes = {
  plan: "Arcade" | "Advanced" | "Pro";
  billing: "Monthly" | "Yearly";
  price: number;
};

export type AddOnsTypes = {
  addOnsTitles: string[];
  addOnsPrice: number[];
};
