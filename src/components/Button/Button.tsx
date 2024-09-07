import styles from "./Button.module.scss";

interface ButtonProps {
  button: string;
}

export const Button = ({ button }: ButtonProps) => {
  return (
    <button type="submit" className={styles.button}>
      {button}
    </button>
  );
};
