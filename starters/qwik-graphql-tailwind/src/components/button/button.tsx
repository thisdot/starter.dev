import { component$, PropFunction } from '@builder.io/qwik';

interface ButtonProps {
  action$: PropFunction<() => void>;
  title: string;
}

export const Button = component$((props: ButtonProps) => {
  return (
    <button
      class="rounded bg-blue-500 py-2 px-4 align-middle text-xl font-semibold leading-none text-white hover:bg-blue-700"
      onClick$={props.action$}
    >
      {props.title}
    </button>
  );
});
