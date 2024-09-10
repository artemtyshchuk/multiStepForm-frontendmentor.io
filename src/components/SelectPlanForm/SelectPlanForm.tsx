import { useForm } from "react-hook-form";
import styles from "./SelectPlanForm.module.scss";
import { SelectPlanTypes } from "types/types";
import { ReactComponent as ArcadeIcon } from "assets/images/icon-arcade.svg";
import { ReactComponent as AdvancedIcon } from "assets/images/icon-advanced.svg";
import { ReactComponent as ProIcon } from "assets/images/icon-pro.svg";
import { Button } from "components/Button";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { setSelectedPlan } from "../../redux/forms-slice";
import { setActiveStep } from "../../redux/activeStep-slice";
import { PlanOption } from "./PlanOption";

export const SelectPlanForm = () => {
  const selectedPlan = useAppSelector(
    (state) => state.setPersonalData.selectedPlan
  );

  const { register, watch, setValue, handleSubmit } = useForm<SelectPlanTypes>({
    mode: "onChange",
    defaultValues: selectedPlan,
  });

  const dispatch = useAppDispatch();
  const planWatcher = watch("plan");

  const reduxBilling = useAppSelector(
    (state) => state.setPersonalData.selectedPlan.billing
  );
  const activeStep = useAppSelector((state) => state.activeStep);

  const isYearly = reduxBilling === "Yearly";

  const handleBillingChange = () => {
    const newBilling = isYearly ? "Monthly" : "Yearly";
    setValue("billing", newBilling);
    dispatch(setSelectedPlan({ ...watch(), billing: newBilling }));
  };

  const onSubmit = (data: SelectPlanTypes) => {
    const price =
      data.plan === "Arcade"
        ? isYearly
          ? 90
          : 9
        : data.plan === "Advanced"
        ? isYearly
          ? 120
          : 12
        : isYearly
        ? 150
        : 15;

    dispatch(setSelectedPlan({ ...data, price }));
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  return (
    <form className={styles.selectPlanForm} onSubmit={handleSubmit(onSubmit)} data-testid="select-plan-form">
      <p className={styles.title}>Select your plan</p>
      <p className={styles.subTitle}>
        You have the option of monthly or yearly billing.
      </p>
      <div className={styles.planInputsContainer}>
        <PlanOption
          icon={ArcadeIcon}
          planName="Arcade"
          planValue="Arcade"
          planPrice={isYearly ? "$90/yr" : "$9/mo"}
          isYearly={isYearly}
          discount="2 months free"
          register={register}
          selectedPlan={planWatcher}
        />
        <PlanOption
          icon={AdvancedIcon}
          planName="Advanced"
          planValue="Advanced"
          planPrice={isYearly ? "$120/yr" : "$12/mo"}
          isYearly={isYearly}
          discount="2 months free"
          register={register}
          selectedPlan={planWatcher}
        />
        <PlanOption
          icon={ProIcon}
          planName="Pro"
          planValue="Pro"
          planPrice={isYearly ? "$150/yr" : "$15/mo"}
          isYearly={isYearly}
          discount="2 months free"
          register={register}
          selectedPlan={planWatcher}
        />
      </div>

      <div className={styles.planTypeSwitcherContainer}>
        <p
          className={`${styles.planTypeTitle} ${
            !isYearly && styles.planTypeTitle__active
          }`}
        >
          Monthly
        </p>
        <label className={styles.switcher}>
          <input
            type="checkbox"
            className={styles.switcherInput}
            checked={isYearly}
            onChange={handleBillingChange}
          />
          <span className={styles.switcherSlider}></span>
        </label>

        <p
          className={`${styles.planTypeTitle} ${
            isYearly && styles.planTypeTitle__active
          }`}
        >
          Yearly
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
    </form>
  );
};
