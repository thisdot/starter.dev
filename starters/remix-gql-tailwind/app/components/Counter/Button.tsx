import * as styles from './Counter.classNames';

interface ButtonProps {
  action: () => void;
  title: string;
}

export const  Button = ({ action, title }: ButtonProps) => {
  return <button className={styles.button} onClick={action}>{title}</button>;
}