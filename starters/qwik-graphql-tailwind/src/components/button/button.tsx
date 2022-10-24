import { component$, PropFunction } from '@builder.io/qwik';
import * as styles from './button.classNames';

interface ButtonProps {
  action$: PropFunction<() => void>;
  title: string;
}

export const Button = component$((props: ButtonProps) => {
  return (
    <button className={styles.button} onClick$={props.action$}>
      {props.title}
    </button>
  );
});
