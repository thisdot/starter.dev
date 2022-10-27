import { children, splitProps } from 'solid-js';

const CounterButton = (props) => {
  const [local, others] = splitProps(props, ['onClick']);
  const c = children(() => props.children);

  return (
    <button
      type="button"
      class="bg-blue-500 text-white text-base font-medium px-4 py-2 rounded-md outline-none"
      onClick={() => local.onClick()}
      {...others}
    >
      {c()}
    </button>
  );
};

export default CounterButton;
