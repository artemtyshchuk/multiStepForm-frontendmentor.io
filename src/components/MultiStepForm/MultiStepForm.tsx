import { useAppSelector } from "redux-hooks";
import { StepsBar } from "../StepsBar";
import styles from "./MultiStepForm.module.scss";
import { YourInfo } from "components/YourInfo";
import { useEffect, useState } from "react";
import { Button } from "components/Button";

interface MultiStepFormProps {}

export const MultiStepForm = ({}: MultiStepFormProps) => {
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
        return <YourInfo />;
      // case 2:
      //   return <SelectPlanForm />;
      // case 3:
      //   return <AddOnsForm />;
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

      {screenSize.mobileScreen && (
        <div className={styles.buttonContainer}>
          <Button button="Next Step" />
        </div>
      )}
    </div>
  );
};
