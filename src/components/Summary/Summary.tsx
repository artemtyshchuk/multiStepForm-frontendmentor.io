import { useAppDispatch, useAppSelector } from "redux-hooks";
import styles from "./Summary.module.scss";
import { setActiveStep } from "../../redux/activeStep-slice";
import { Button } from "components/Button";
import { useEffect, useState } from "react";
import { SuccessPage } from "../SuccessPage";
import { ErrorNotification } from "./ErrorNotification";

export const Summary = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useAppDispatch();

  const activeStep = useAppSelector((state) => state.activeStep);
  const selectedPlan = useAppSelector(
    (state) => state.setPersonalData.selectedPlan
  );
  const { plan, billing, price } = selectedPlan;

  const addedOns = useAppSelector((state) => state.setPersonalData.addOns);
  const { addOnsTitles, addOnsPrice } = addedOns;

  const yearly = useAppSelector(
    (state) => state.setPersonalData.selectedPlan.billing === "Yearly"
  );

  const personalData = useAppSelector(
    (state) => state.setPersonalData.personalInfo
  );

  const handleChange = () => {
    dispatch(setActiveStep(2));
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  useEffect(() => {
    console.log("Error state changed:", error);
  }, [error]);

  const monthlySubscription = () => {
    return price + addOnsPrice.reduce((a, c) => a + c, 0);
  };

  const yearlySubscription = () => {
    return price + addOnsPrice.reduce((a, c) => a + c, 0) * 10;
  };

  const handleGlobalSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (personalData.email && personalData.name && personalData.phone) {
      setSuccess(true);
    } else {
      setError(true);

      setTimeout(() => {
        dispatch(setActiveStep(1));
      }, 3000);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      {success ? (
        <SuccessPage />
      ) : (
        <form className={styles.summary} onSubmit={handleGlobalSubmit}>
          <p className={styles.title}>Finishing up</p>
          <p className={styles.subTitle}>
            Double-check everything looks OK before confirming.
          </p>

          <div className={styles.summaryContainer}>
            <div className={styles.summaryTitleContainer}>
              <div className={styles.summaryTitleWrapper}>
                <p className={styles.summaryTitle}>{`${plan} (${billing})`}</p>
                <button className={styles.changeButton} onClick={handleChange}>
                  Change
                </button>
              </div>
              <div className={styles.summaryPriceContainer}>
                <p className={styles.summaryPrice}>
                  {yearly ? `${price}/yr` : `${price}/mo`}
                </p>
              </div>

              {addOnsTitles.length > 0 && (
                <span className={styles.divider}></span>
              )}
            </div>

            <div className={styles.addOnsContainer}>
              {addOnsTitles.map((title, index) => (
                <div className={styles.addOnsWrapper} key={index}>
                  <p className={styles.addOnsTitle}>{title}</p>
                  <p className={styles.addOnsPrice}>
                    +$
                    {yearly
                      ? `${addOnsPrice[index] * 10}/yr`
                      : `${addOnsPrice[index]}/mo`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.totalContainer}>
            <p className={styles.addOnsTitle}>
              {yearly ? `Total (per year)` : `Total (per month)`}
            </p>
            <p className={styles.totalPrice}>
              {yearly
                ? `+${yearlySubscription()}/yr`
                : `+${monthlySubscription()}/mo`}
            </p>
          </div>

          <div className={styles.buttonsContainer}>
            <Button
              button="backPage"
              buttonText="Go Back"
              type="button"
              onClick={handleBack}
            />
            <Button button="nextPage" buttonText="Next Step" type="submit" />
          </div>
          {error && <ErrorNotification />}
        </form>
      )}
    </div>
  );
};
