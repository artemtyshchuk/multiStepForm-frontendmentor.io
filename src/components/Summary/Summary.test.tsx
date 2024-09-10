import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Summary } from "./Summary";

import { store } from "store";

describe("Summary Component", () => {
  it("should render form with expected elements", () => {
    render(
      <Provider store={store}>
        <Summary />
      </Provider>
    );

    expect(screen.getByText(/Finishing up/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Double-check everything looks OK before confirming./i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("buttons")).toBeInTheDocument();
    expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Step/i)).toBeInTheDocument();
  });
});
