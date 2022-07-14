import type { NextPage } from 'next';
import { Counter } from "src/components";
import { NavigationLink } from "src/components";

const CounterExample: NextPage = () => {
  return (
    <div className="w-3/5 my-5 mx-auto text-center">
      <h1 className="text-[2rem] font-bold border-b-4 border-blue-600 py-4 my-5">
        Increment, Decrement and Reset Button Example
      </h1>
      <div className="py-5">
        <Counter />
      </div>       
      <div className="my-2.5">
        <NavigationLink to="/" label="Return Home" />
      </div>
    </div>
  );
}

export default CounterExample;
