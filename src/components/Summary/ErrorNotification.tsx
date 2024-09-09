import styles from "./Summary.module.scss";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export const ErrorNotification = () => {
  const modalAnimation = {
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        ease: "easeIn",
        duration: 0.3,
      },
    },
  };

  return createPortal(
    <motion.div
      className={styles.errorNotificationContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalAnimation}
    >
      <h1 className={styles.errorTitle}>
        Please provide your personal information
      </h1>
    </motion.div>,

    document.getElementById("portal") as HTMLElement
  );
};
