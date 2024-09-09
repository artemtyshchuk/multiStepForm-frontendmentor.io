import styles from "./SuccessPage.module.scss";
import { ReactComponent as SuccessIcon } from "assets/images/icon-thank-you.svg";

interface SuccessPageProps {}

export const SuccessPage = ({}: SuccessPageProps) => {
  return (
    <div className={styles.successPage}>
      <div style={{ margin: "0 auto" }}>
        <SuccessIcon />
      </div>
      <p className={styles.title}>Thank you!</p>
      <p className={styles.description}>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
};
