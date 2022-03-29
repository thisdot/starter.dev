import * as styles from './Greeting.classNames';

interface GreetingProps {
  message: string;
}

export function Greeting({ message }: GreetingProps) {
  return (
    <h1
      className={styles.h1Text}
    >
      {message}
    </h1>
  );
}
