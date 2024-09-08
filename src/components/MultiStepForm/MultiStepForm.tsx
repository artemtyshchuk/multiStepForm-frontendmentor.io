import { useAppSelector } from "redux-hooks";
import { StepsBar } from "../StepsBar";
import styles from "./MultiStepForm.module.scss";
import { YourInfoForm } from "components/YourInfoForm";
import { useEffect, useState } from "react";
import { SelectPlanForm } from "components/SelectPlanForm";
import { AddOnsForm } from "components/AddOnsForm";

export const MultiStepForm = () => {
  const activeStep = useAppSelector((state) => state.activeStep);

  const [screenSize, setScreenSize] = useState({
    mobileScreen: window.matchMedia("(max-width: 576px)").matches,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        mobileScreen: window.matchMedia("(max-width: 576px)").matches,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderStepForm = () => {
    switch (activeStep) {
      case 1:
        return <YourInfoForm />;
      case 2:
        return <SelectPlanForm />;
      case 3:
        return <AddOnsForm />;
      // case 4:
      //   return <SummaryForm />;
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
