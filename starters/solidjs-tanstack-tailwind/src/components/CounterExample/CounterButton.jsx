const CounterButton = (props) => {
  const { onClick, children } = props;

  return (
    <button
      type="button"
      class="bg-blue-500 text-white text-base font-medium px-4 py-2 rounded-md outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CounterButton;
