import { counterData } from './CounterStore';
import { ActionButtonsData } from "./types";

export default function CounterExample() {
  return (
    <div class="flex flex-wrap lg:flex-nowrap justify-center gap-14 items-center">
      <strong data-testId={'counter'} class="text-xl">
        Count: {counterData.count()}
      </strong>
      {counterData.actionButtons.map((btn: ActionButtonsData) =>
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
