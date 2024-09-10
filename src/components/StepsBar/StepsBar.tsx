import { useState } from "react";
import { StepComponent } from "./StepComponent";
import styles from "./StepsBar.module.scss";
import { StepsType } from "types/types";
import { stepData } from "../../data/stepData";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { setActiveStep } from "../../redux/activeStep-slice";

export const StepsBar = () => {
  const [steps] = useState<StepsType[]>(stepData);

  const dispatch = useAppDispatch();

  const activeStep = useAppSelector((state) => state.activeStep);

  const handleActiveStep = (step: number) => {
    dispatch(setActiveStep(step));
  };

  return (
    <div className={styles.stepsBar} data-testid="steps-bar">
      {steps.map((step) => (
        <StepComponent
          key={step.id}
          id={step.id}
          title={step.title}
          subTitle={step.subTitle}
          activeStep={activeStep}
          setActiveStep={handleActiveStep}
        />
      ))}
    </div>
  );
};
