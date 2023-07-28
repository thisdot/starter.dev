import { SetStateAction } from "react";
import { Counter } from "./Counter";

export default {
  title: "Pages/Counter",
  component: Counter,
};

export const CounterExamplePage = () => (
  <Counter
    count={0}
    setCount={function (value: SetStateAction<number>): void {
      throw new Error("Function not implemented.");
    }}
  />
);
