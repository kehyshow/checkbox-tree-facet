import { render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  test("renders the component without errors", () => {
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });
});