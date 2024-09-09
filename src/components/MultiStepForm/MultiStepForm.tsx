import { useAppSelector } from "redux-hooks";
import { StepsBar } from "../StepsBar";
import styles from "./MultiStepForm.module.scss";
import { YourInfoForm } from "components/YourInfoForm";
import { SelectPlanForm } from "components/SelectPlanForm";
import { AddOnsForm } from "components/AddOnsForm";
import { Summary } from "components/Summary";

export const MultiStepForm = () => {
  const activeStep: number = useAppSelector((state) => state.activeStep);

  const renderStepForm = () => {
    switch (activeStep) {
      case 1:
        return <YourInfoForm />;
      case 2:
        return <SelectPlanForm />;
      case 3:
        return <AddOnsForm />;
      case 4:
        return <Summary />;
      default:
        return <YourInfoForm />;
    }
  };

  return (
    <div className={styles.multiStepForm}>
      <div className={styles.stepsBarContainer}>
        <StepsBar />
      </div>

      <div className={styles.formsContainer}>{renderStepForm()}</div>
    </div>
  );
};
