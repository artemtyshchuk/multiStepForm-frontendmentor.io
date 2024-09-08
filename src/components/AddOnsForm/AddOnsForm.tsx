import { Button } from "components/Button";
import styles from "./AddOnsForm.module.scss";
import { AddOnsOption } from "./AddOnsOption";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { setActiveStep } from "../../redux/activeStep-slice";
import { useForm } from "react-hook-form";
import { AddOnsTypes } from "types/types";
import { setAddOns } from "../../redux/forms-slice";

interface AddOnsFormProps {}

export const AddOnsForm = ({}: AddOnsFormProps) => {
  const activeStep = useAppSelector((state) => state.activeStep);

  const checkedOptions = useAppSelector(
    (state) => state.setPersonalData.addOns.addOnsTitles
  );

  const dispatch = useAppDispatch();

  const { register, watch, handleSubmit } = useForm<AddOnsTypes>({
    mode: "onChange",
    defaultValues: { addOnsTitles: checkedOptions || [] },
  });

  const watcher = watch("addOnsTitles");

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const onSubmit = (data: AddOnsTypes) => {
    dispatch(setActiveStep(activeStep + 1));
    dispatch(setAddOns(data));
  };

  return (
    <form className={styles.addOnsForm} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.title}>Pick add-ons</p>
      <p className={styles.subTitle}>
        Add-ons help enhance your gaming experience.
      </p>
      <div className={styles.addOnsContainer}>
        <AddOnsOption
          title="Online service"
          subTitle="Access to multiplayer games"
          price="1"
          register={register}
          checked={watcher.includes("Online service")}
        />
        <AddOnsOption
          title="Larger storage"
          subTitle="Extra 1TB of cloud save"
          price="2"
          register={register}
          checked={watcher.includes("Larger storage")}
        />
        <AddOnsOption
          title="Customizable profile"
          subTitle="Custom theme on your profile"
          price="2"
          register={register}
          checked={watcher.includes("Customizable profile")}
        />
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
