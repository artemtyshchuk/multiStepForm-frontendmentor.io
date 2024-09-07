import { StepsType } from "types/types";
import styles from "./StepsBar.module.scss";
import { useEffect, useState } from "react";

interface StepComponentProps extends StepsType {
  activeStep: number;
  setActiveStep: (step: number) => void;
}
export const StepComponent = (props: StepComponentProps) => {
  const { id, title, subTitle, activeStep, setActiveStep } = props;

  const [screenSize, setScreenSize] = useState({
    mobileScreen: window.matchMedia("(max-width: 576px)").matches,
  });

  const handleStep = () => {
    setActiveStep(id);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        mobileScreen: window.matchMedia("(max-width: 576px)").matches,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className={styles.stepContainer} onClick={handleStep}>
        <div className={styles.stepNumberContainer}>
          <div
            className={`${styles.stepNumberWrapper} ${
              activeStep === id && styles.stepNumberWrapper__active
            }`}
          >
            <p
              className={`${styles.number} ${
                activeStep === id && styles.number__active
              }`}
            >
              {id}
            </p>
          </div>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.stepTitle}>
            {screenSize.mobileScreen ? null : subTitle}
          </p>
          <p className={styles.stepSubTitle}>
            {screenSize.mobileScreen ? null : title}
          </p>
        </div>
      </div>
    </div>
  );
};
