import { component$, PropFunction } from '@builder.io/qwik';

export const buttonClassNames = 'w-40 h-40 rounded-full border-none bg-white shadow-lg text-7xl cursor-pointer my-0 mx-8 focus:outline-0';

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
