import { useForm } from "react-hook-form";
import styles from "./YourInfoForm.module.scss";
import { PersonalInfoTypes } from "types/types";
import { Button } from "components/Button";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { setActiveStep } from "../../redux/activeStep-slice";
import { setPersonalInfo } from "../../redux/forms-slice";

export const YourInfoForm = () => {
  const personalInfo = useAppSelector(
    (state) => state.setPersonalData.personalInfo
  );

  const { register, formState, handleSubmit } = useForm<PersonalInfoTypes>({
    mode: "onChange",
    defaultValues: personalInfo,
  });

  const activeStep = useAppSelector((state) => state.activeStep);
  const dispatch = useAppDispatch();

  const nameInputError = formState.errors["name"]?.message;
  const emailInputError = formState.errors["email"]?.message;
  const phoneInputError = formState.errors["phone"]?.message;

  const onSubmit = (data: PersonalInfoTypes) => {
    dispatch(setPersonalInfo(data));
    dispatch(setActiveStep(activeStep + 1));
  };

  return (
    <form className={styles.yourInfo} onSubmit={handleSubmit(onSubmit)} data-testid="your-info-form">
      <p className={styles.title}>Personal info</p>
      <p className={styles.subTitle}>
        Please provide your name, email address, and phone number.
      </p>
      <div className={styles.inputsContainer}>
        {/* name input  */}
        <div className={styles.nameInputContainer}>
          <div className={styles.inputLabelContainer}>
            <div>
              <label className={styles.inputLabel}>Name</label>
            </div>
            <div>
              {nameInputError && (
                <p className={styles.validationTextError} data-testid="errorText">{nameInputError}</p>
              )}
            </div>
          </div>
          <input
            type="text"
            autoComplete="off"
            className={`${styles.input} ${
              nameInputError && styles.input__error
            }`}
            placeholder="e.g. Stephen King"
            {...register("name", { required: "This field is required" })}
          />
        </div>

        {/* email input  */}
        <div className={styles.emailInputContainer}>
          <div className={styles.inputLabelContainer}>
            <div>
              <label className={styles.inputLabel}>Email Address</label>
            </div>
            <div>
              {emailInputError && (
                <p className={styles.validationTextError}>{emailInputError}</p>
              )}
            </div>
          </div>
          <input
            type="email"
            autoComplete="off"
            className={`${styles.input} ${
              emailInputError && styles.input__error
            }`}
            placeholder="e.g. stephenking@lorem.com"
            {...register("email", { required: "This field is required" })}
          />
        </div>

        {/* phone input */}
        <div className={styles.phoneInputContainer}>
          <div className={styles.inputLabelContainer}>
            <div>
              <label className={styles.inputLabel}>Phone Number</label>
            </div>
            <div>
              {phoneInputError && (
                <p className={styles.validationTextError}>{phoneInputError}</p>
              )}
            </div>
          </div>
          <input
            type="number"
            autoComplete="off"
            className={`${styles.input} ${
              phoneInputError && styles.input__error
            }`}
            placeholder="e.g. +1 234 567 890"
            {...register("phone", { required: "This field is required" })}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button button="nextPage" buttonText="Next Step" type="submit" />
      </div>
    </form>
  );
};
