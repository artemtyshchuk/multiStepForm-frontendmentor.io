import styles from "./AddOnsForm.module.scss";
import { ReactComponent as CheckIcon } from "assets/images/icon-checkmark.svg";
interface AddOnsOptionProps {
  title: string;
  subTitle: string;
  price: number;
  register: any;
  checked: boolean;
}

export const AddOnsOption = ({
  title,
  subTitle,
  price,
  register,
  checked,
}: AddOnsOptionProps) => {
  return (
    <label
      className={`${styles.addOnsOptionContainer} ${
        checked && styles.addOnsOptionContainer__active
      }`}
    >
      <div>
        <div
          className={`${styles.checkboxIconContainer} ${
            checked && styles.checkboxIconContainer__checked
          }`}
        >
          <CheckIcon className={styles.checkboxIcon} />
        </div>
        <input
          type="checkbox"
          value={title}
          {...register("addOnsTitles")}
          defaultChecked={checked}
          className={styles.addOnsInput}
        />
      </div>
      <div>
        <p className={styles.addOnsTitle}>{title}</p>
        <p className={styles.addOnsSubTitle}>{subTitle}</p>
      </div>
      <div>
        <p className={styles.addOnsPrice}>+${price}/mo</p>
      </div>
    </label>
  );
};
