import { MultiStepForm } from "./MultiStepForm";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store";

const mockMatchMedia = (matches: boolean) =>
  jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));

describe("MultiStepForm", () => {
  beforeEach(() => {
    window.matchMedia = mockMatchMedia(false);
  });

  it("renders MultiStepForm with correct elements", () => {
    render(
      <Provider store={store}>
        <MultiStepForm />
      </Provider>
    );

    expect(screen.getByTestId("multi-step-form")).toBeInTheDocument();
    expect(screen.getByTestId("steps-bar")).toBeInTheDocument();
  });

  it("renders the YourInfoForm when activeStep is 1", () => {
    render(
      <Provider store={store}>
        <MultiStepForm />
      </Provider>
    );

    expect(screen.getByTestId("your-info-form")).toBeInTheDocument();
  });
});
