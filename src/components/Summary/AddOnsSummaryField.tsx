import styles from "./Summary.module.scss";

export const AddOnsSummaryField = (
  addOnsTitles: string,
  addOnPrice: number
) => {
  return (
    <div className={styles.addOnsWrapper}>
      <p className={styles.addOnsTitle}>{addOnsTitles}</p>
      <p className={styles.addOnsPrice}>+${addOnPrice}/mo</p>
    </div>
  );
};
