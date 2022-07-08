import type { NextPage } from 'next';
import { Counter } from "src/components";
import { NavigationLink } from "src/components";
import { Greeting } from 'src/components/Greeting';

const CounterExample: NextPage = () => {
  return (
    <div className="w-2/5 my-5 mx-auto text-center">
      <h1 className="text-[2rem] font-bold border-b-4 border-blue-600 py-4 my-5">
          Apollo Fetch Data From API
      </h1>
      <Greeting />
      <div className="my-2.5">
        <NavigationLink to="/" label="Return Home"/>
      </div>
    </div>
  );
}

export default CounterExample;


      
      