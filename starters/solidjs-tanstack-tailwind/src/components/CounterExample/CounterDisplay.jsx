import { count } from './index';

const CounterDisplay = () => (
  <strong role="display-count" class="text-xl">
    Count: {count()}
  </strong>
);

export default CounterDisplay;
