import styles from "./SelectPlanForm.module.scss";
import { motion } from "framer-motion";

interface PlanOptionProps {
  icon: React.ElementType;
  planName: string;
  planValue: string;
  planPrice: string;
  isYearly: boolean;
  discount: string;
  register: any;
  selectedPlan: string;
}

export const PlanOption = ({
  icon: Icon,
  planName,
  planValue,
  planPrice,
  isYearly,
  discount,
  register,
  selectedPlan,
}: PlanOptionProps) => (
  <label
    className={`${styles.planContainer} ${
      selectedPlan === planValue && styles.planContainer__active
    }`}
  >
    <input
      className={styles.planInput}
      type="radio"
      value={planValue}
      {...register("plan")}
    />
    <Icon />
    <div className={styles.planInfoContainer}>
      <p className={styles.planName}>{planName}</p>
      <p className={styles.planPrice}>{planPrice}</p>
      <motion.p
        className={styles.discount}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isYearly ? 1 : 0,
          height: isYearly ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {discount}
      </motion.p>
    </div>
  </label>
);
