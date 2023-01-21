import { render, screen, fireEvent } from "@testing-library/react";
import CounterExample from "../../pages/counter-example";
import "@testing-library/jest-dom";

describe("Counter Example page", () => {
  it("renders a heading", () => {
    render(<CounterExample />);

    const heading = screen.getByRole("heading", {
      name: "Increment, Decrement and Reset Button Examples",
    });

    expect(heading).toBeInTheDocument();
  });
});

describe("Increment Counter", () => {
  it("should increase by 1 when clicking the button", () => {
    render(<CounterExample />);

    const currentCount = screen.getByText("0");
    const button = screen.getByText("Increment");
    expect(currentCount).toHaveTextContent("0");

    fireEvent.click(button);
    expect(currentCount).toHaveTextContent("1");

    fireEvent.click(button);
    expect(currentCount).toHaveTextContent("2");
  });
});

describe("Decrement Counter", () => {
  it("should decrease by 1 when clicking the button", () => {
    render(<CounterExample />);

    const currentCount = screen.getByText("0");
    const button = screen.getByText("Decrement");
    expect(currentCount).toHaveTextContent("0");

    fireEvent.click(button);
    expect(currentCount).toHaveTextContent("-1");

    fireEvent.click(button);
    expect(currentCount).toHaveTextContent("-2");
  });
});

describe("Reset Counter", () => {
  it("should reset the count when the reset button is clicked", () => {
    render(<CounterExample />);

    const currentCount = screen.getByText("0");
    const incrementButton = screen.getByText("Increment");
    const resetButton = screen.getByText("Reset");

    expect(currentCount).toHaveTextContent("0");

    fireEvent.click(incrementButton);
    expect(currentCount).toHaveTextContent("1");

    fireEvent.click(incrementButton);
    expect(currentCount).toHaveTextContent("2");

    fireEvent.click(resetButton);
    expect(currentCount).toHaveTextContent("0");
  });
});
