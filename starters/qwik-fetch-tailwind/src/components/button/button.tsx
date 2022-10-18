import { component$, PropFunction } from '@builder.io/qwik';

export const buttonClassNames = 'w-28 h-28 rounded-full border-none bg-white shadow-lg text-6xl cursor-pointer my-0 mx-4 focus:outline-0';

interface ButtonProps {
  action$: PropFunction<() => void>;
  title: string;
}

export const Button = component$((props: ButtonProps) => {
  return (
    <button className={buttonClassNames} onClick$={props.action$}>
      {props.title}
    </button>
  );
});
