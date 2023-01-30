import { createSignal } from "solid-js";
import { ActionButtonsData, CounterData } from "./types";

const getCounterData = (): CounterData => {
  const [count, setCount] = createSignal<number>(0);
  return {
    count: count,
    actionButtons: [
      {
        label: "Increment",
        action: () => setCount(count() + 1)
      },
      {
        label: "Decrement",
        action: () => setCount(count() - 1)
      },
      {
        label: "Reset",
        action: () => setCount(0)
      },
    ]
  }
}

export default function CounterExample() {
  const data = getCounterData()

  return (
    <div class="flex flex-wrap lg:flex-nowrap justify-center gap-14 items-center">
      <strong data-testId={'counter'} class="text-xl">
        Count: {data.count()}
      </strong>
      {data.actionButtons.map((btn: ActionButtonsData) =>
        <button
          type="button"
          class="bg-blue-500 text-white text-base font-medium px-4 py-2 rounded-md outline-none"
          onClick={btn.action}>
          {btn.label}
        </button>
      )}
    </div>
  );
}
