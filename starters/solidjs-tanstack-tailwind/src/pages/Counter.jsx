import { NavLink } from '@solidjs/router';
import CounterExample from '../components/CounterExample';
import CounterHeading from '../components/CounterExample/CounterHeading';

const Counter = () => {
  return (
    <div>
      <CounterHeading />
      <CounterExample />
      <div class="mt-8">
        <NavLink
          href="/"
          class="transition-colors delay-100 underline text-blue-600 text-lg"
        >
          Return Home
        </NavLink>
      </div>
    </div>
  );
};

export default Counter;
