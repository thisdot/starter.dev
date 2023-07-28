import fetch from "jest-fetch-mock";
import { render, screen } from "@testing-library/react";
import FetchExample from "../src/pages/fetch-example";
import "@testing-library/jest-dom";

describe("Fetch Example page", () => {
  it("renders a heading", () => {
    render(<FetchExample />);

    const heading = screen.getByRole("heading", {
      name: "NextJS fetching data example from a REST API",
    });

    expect(heading).toBeInTheDocument();
  });
});

beforeEach(() => {
  fetch.resetMocks();
});

it("returns a string result for the starter REST API", () => {
  fetch.mockResponseOnce("Hello, from This Dot Labs!");
  const onResponse = jest.fn();
  const onError = jest.fn();

  return fetch(
    "https://api.starter.dev/.netlify/functions/server/hello?greeting=from This Dot Labs!"
  )
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });
});
