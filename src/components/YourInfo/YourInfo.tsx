import { useForm } from "react-hook-form";
import styles from "./YourInfo.module.scss";
import { PersonalInfoTypes } from "types/types";
import { Button } from "components/Button";

interface YourInfoProps {}

export const YourInfo = ({}: YourInfoProps) => {
  const { register, formState, handleSubmit } = useForm<PersonalInfoTypes>({
    mode: "onChange",
  });

  const nameInputError = formState.errors["name"]?.message;
  const emailInputError = formState.errors["email"]?.message;
  const phoneInputError = formState.errors["phone"]?.message;

  const onSubmit = (data: PersonalInfoTypes) => {
    console.log(data);
  };

  return (
    <div className={styles.yourInfo}>
      <p className={styles.title}>Personal info</p>
      <p className={styles.subTitle}>
        Please provide your name, email address, and phone number.
      </p>
      <form
        className={styles.inputsContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name input  */}
        <div className={styles.nameInputContainer}>
          <div className={styles.inputLabelContainer}>
            <div>
              <label className={styles.inputLabel}>Name</label>
            </div>
            <div>
              {nameInputError && (
                <p className={styles.validationTextError}>{nameInputError}</p>
              )}
            </div>
          </div>
          <input
            type="text"
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
            type="text"
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
            className={`${styles.input} ${
              phoneInputError && styles.input__error
            }`}
            placeholder="e.g. +1 234 567 890"
            {...register("phone", { required: "This field is required" })}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button button="Next Step" />
        </div>
      </form>
    </div>
  );
};
