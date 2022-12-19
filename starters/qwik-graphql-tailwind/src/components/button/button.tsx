import { component$, PropFunction } from '@builder.io/qwik';

interface ButtonProps {
  action$: PropFunction<() => void>;
  title: string;
}

export const Button = component$((props: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-semibold leading-none align-middle py-2 px-4 rounded"
      onClick$={props.action$}
    >
      {props.title}
    </button>
  );
});
