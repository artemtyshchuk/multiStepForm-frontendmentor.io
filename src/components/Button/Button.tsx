import styles from "./Button.module.scss";

interface ButtonProps {
  buttonText: string;
  button: "nextPage" | "backPage";
  type: "submit" | "button";
  onClick?: () => void;
}

export const Button = ({ buttonText, button, type, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${
        button === "nextPage" && styles.button__nextPage
      } ${button === "backPage" && styles.button__backPage} `}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};
