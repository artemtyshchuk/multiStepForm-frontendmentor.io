import { useForm } from "react-hook-form";
import styles from "./SelectPlanForm.module.scss";
import { SelectPlanTypes } from "types/types";
import { ReactComponent as ArcadeIcon } from "assets/images/icon-arcade.svg";
import { ReactComponent as AdvancedIcon } from "assets/images/icon-advanced.svg";
import { ReactComponent as ProIcon } from "assets/images/icon-pro.svg";
import { Button } from "components/Button";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { setSelectedPlan } from "../../redux/forms-slice";
import { setActiveStep } from "../../redux/activeStep-slice";

export const SelectPlanForm = () => {
  const selectedPlan = useAppSelector(
    (state) => state.setPersonalData.selectedPlan
  );

  const { register, watch, formState, setValue, handleSubmit } =
    useForm<SelectPlanTypes>({
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

  const planInputError = formState.errors["plan"]?.message;

  const handleBillingChange = () => {
    const newBilling = isYearly ? "Monthly" : "Yearly";
    setValue("billing", newBilling);
    dispatch(setSelectedPlan({ ...watch(), billing: newBilling }));
  };

  const onSubmit = (data: SelectPlanTypes) => {
    dispatch(setSelectedPlan(data));
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    console.log("handleBack");
    dispatch(setActiveStep(activeStep - 1));
  };

  return (
    <form className={styles.selectPlanForm} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.title}>Select your plan</p>
      <p className={styles.subTitle}>
        You have the option of monthly or yearly billing.
      </p>
      <div className={styles.planInputsContainer}>
        {/* plan arcade */}
        <label
          className={`${styles.planContainer} ${
            planWatcher === "Arcade" && styles.planContainer__active
          }`}
        >
          <input
            className={styles.planInput}
            type="radio"
            value="Arcade"
            {...register("plan", {
              required: "Plan is required",
            })}
          />
          <ArcadeIcon />
          <div className={styles.planInfoContainer}>
            <p className={styles.planName}>Arcade</p>
            <p className={styles.planPrice}>{isYearly ? "$90/yr" : "$9/mo"}</p>
            <motion.p
              className={styles.discount}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isYearly ? 1 : 0,
                height: isYearly ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              2 months free
            </motion.p>
          </div>
        </label>

        {/* plan advanced */}
        <label
          className={`${styles.planContainer} ${
            planWatcher === "Advanced" && styles.planContainer__active
          }`}
        >
          <input
            className={styles.planInput}
            type="radio"
            value="Advanced"
            {...register("plan", {
              required: "Plan is required",
            })}
          />
          <AdvancedIcon />
          <div className={styles.planInfoContainer}>
            <p className={styles.planName}>Advanced</p>
            <p className={styles.planPrice}>
              {isYearly ? "$120/yr" : "$12/mo"}
            </p>
            <motion.p
              className={styles.discount}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isYearly ? 1 : 0,
                height: isYearly ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              2 months free
            </motion.p>
          </div>
        </label>

        {/* plan pro */}
        <label
          className={`${styles.planContainer} ${
            planWatcher === "Pro" && styles.planContainer__active
          }`}
        >
          <input
            className={styles.planInput}
            type="radio"
            value="Pro"
            {...register("plan", {
              required: "Plan is required",
            })}
          />
          <ProIcon />
          <div className={styles.planInfoContainer}>
            <p className={styles.planName}>Pro</p>
            <p className={styles.planPrice}>
              {isYearly ? "$150/yr" : "$15/mo"}
            </p>
            <motion.p
              className={styles.discount}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isYearly ? 1 : 0,
                height: isYearly ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              2 months free
            </motion.p>
          </div>
        </label>
      </div>
      <div>
        {planInputError && <p className={styles.error}>{planInputError}</p>}
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
